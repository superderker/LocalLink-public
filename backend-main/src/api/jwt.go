package api

import (
	"database/sql"
	"fmt"
	"log"
	"main/database"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4" // Updated import path for jwt
	"github.com/joho/godotenv"
)

var jwtKey = readTokenKey()

// Claims struct to encode/decode JWT payload
type Claims struct {
	Userid               string `json:"userid"`
	jwt.RegisteredClaims        // Updated to use RegisteredClaims
}

func readTokenKey() []byte {

	err := godotenv.Load("./envFiles/jwtkey.env")

	if err != nil {
		log.Fatal(err)
	}

	jwtKey := os.Getenv("key")

	return []byte(jwtKey)

}

// Login handler to authenticate user and issue token
func login(c *gin.Context, db *sql.DB) {
	var credentials struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	var userid string
	if err := c.BindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		return
	}
	if strings.Contains("@", credentials.Username) {
		username, mailErr := database.GetUsernameByMail(credentials.Username, db)
		c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
		if mailErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"})
			return
		}
		credentials.Username = username
	}
	validCredentials, err := database.CheckCredentials(credentials.Username, credentials.Password, db)

	if err != nil {
		fmt.Print(err)
	}

	if !validCredentials {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userid, err = database.GetUseridByUsername(credentials.Username, db)

	if err != nil {
		fmt.Print(err)
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Userid: userid,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not create token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func GetUseridByUsername(s string, db *sql.DB) {
	panic("unimplemented")
}

// authenticateJWT middleware to validate token and extract user info
func authenticateJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		const bearerSchema = "Bearer "
		header := c.GetHeader("Authorization")
		if header == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header not provided"})
			c.Abort()
			return
		}

		tokenString := header[len(bearerSchema):]
		claims := &Claims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		// If token is valid, set username in the context for future use
		c.Set("userid", claims.Userid)
		c.Next()
	}
}

func authenticateJWTSingle(c *gin.Context){
			const bearerSchema = "Bearer "
			header := c.GetHeader("Authorization")
			if header == "" {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header not provided"})
				c.Abort()
			}
	
			tokenString := header[len(bearerSchema):]
			claims := &Claims{}
	
			token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
				return jwtKey, nil
			})
	
			if err != nil || !token.Valid {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
				c.Abort()
			}

		c.JSON(http.StatusOK, gin.H{"message" :"Valid Token"})
		}

// Protected endpoint that requires a valid token to access
func getProtectedData(c *gin.Context) {
	userid, exists := c.Get("userid")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fmt.Sprintf("Protected data for user %s", userid)})
}
