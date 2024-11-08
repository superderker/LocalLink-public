package api

import (
	"database/sql"
	"errors"

	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"main/database"
	"main/models"
	"net/http"
)

// ---------- Functions for database requests ---------- //

// ----------- USERS ---------- //

func userById(c *gin.Context, db *sql.DB) {
	id := c.Param("id")
	user, err := database.GetUser(id, db)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": http.StatusNotFound}) // gin.H allows us to write custom txt
		return
	}
	c.IndentedJSON(http.StatusOK, user)
}

func createUser(c *gin.Context, db *sql.DB) {
	var user models.UserCreate
	if err := c.BindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	if err := database.InsertUser(user, db); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	c.IndentedJSON(http.StatusOK, user)
}

func sendMessage(c *gin.Context, db *sql.DB) {
	var message models.SendMessage
	if err := c.BindJSON(&message); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	if err := database.SendMessage(message, db); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	c.IndentedJSON(http.StatusOK, message)
}

func AddUserInterest(c *gin.Context, db *sql.DB) {
	var interest models.Interests
	if err := c.BindJSON(&interest); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	if err := database.AddUserInterest(interest, db); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	c.IndentedJSON(http.StatusOK, interest)
}

// ----------- MATCHED USERS ---------- //

func matchedUsersByMatchId(c *gin.Context, db *sql.DB) {
	activityId := c.Param("activityId")
	matchedUsers, err := getMatchedUsersByMatchId(activityId, db)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Matched users not found."})
		return
	}
	c.IndentedJSON(http.StatusOK, matchedUsers)
}

func getMatchedUsersByMatchId(activityId string, db *sql.DB) (*models.Matchedusers, error) {
	matchedUsers, err := database.GetMatchedusers(activityId, db)

	if err != nil {
		return nil, errors.New("matched users not found")
	}

	return &matchedUsers, nil
}

func addMatchedUser(c *gin.Context, db *sql.DB) {
	var matchedusers models.Matchedusers
	if err := c.BindJSON(&matchedusers); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	if err := database.AddMatchedUser(matchedusers, db); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}

	c.IndentedJSON(http.StatusOK, matchedusers)
}

// ----------- LOCATION ---------- //

func locationByUserId(c *gin.Context, db *sql.DB) {
	userId := c.Param("userId")
	location, err := getLocationByUserId(userId, db)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Location not found."})
		return
	}
	c.IndentedJSON(http.StatusOK, location)
}

func getLocationByUserId(userId string, db *sql.DB) (*models.Location, error) {
	location, err := database.GetLocation(userId, db)

	if err != nil {
		return nil, errors.New("location not found")
	}

	return &location, nil
}

// ----------- INTERESTS ---------- //

func interestsByUserId(c *gin.Context, db *sql.DB) {
	userId := c.Param("userId")
	interests, err := getInterestsByUserId(userId, db)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Interests not found."})
		return
	}
	c.IndentedJSON(http.StatusOK, interests)
}

func getInterestsByUserId(userId string, db *sql.DB) (*models.Interests, error) {
	interests, err := database.GetInterests(userId, db)
	if err != nil {
		return nil, errors.New("interests not found")
	}

	return &interests, nil
}

// ----------- ACTIVITY ---------- //

func activityByID(c *gin.Context, db *sql.DB) {
	activityID := c.Param("activityId")
	activity, err := database.GetActivity(activityID, db)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}
	c.IndentedJSON(http.StatusOK, activity)
}

func activityInterestsByActivityId(c *gin.Context, db *sql.DB) {
	activityId := c.Param("activityId")
	activityInterests, err := getActivityInterestsByActivityId(activityId, db)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Activity interests not found."})
		return
	}
	c.IndentedJSON(http.StatusOK, activityInterests)
}

func getActivityInterestsByActivityId(activityId string, db *sql.DB) (*models.Activityinterests, error) {
	activityInterests, err := database.GetActivityInterests(activityId, db)

	if err != nil {
		return nil, errors.New("activity interests not found")
	}

	return &activityInterests, nil
}

func activityGenderByActivityId(c *gin.Context, db *sql.DB) {
	activityId := c.Param("activityId")
	activityGender, err := getactivityGenderByActivityId(activityId, db)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Activity gender not found."})
		return
	}
	c.IndentedJSON(http.StatusOK, activityGender)
}

func getactivityGenderByActivityId(activityId string, db *sql.DB) (*models.Activitygender, error) {
	activityGender, err := database.GetActivityGender(activityId, db)

	if err != nil {
		return nil, errors.New("activity interests not found")
	}

	return &activityGender, nil

}

func addActivity(c *gin.Context, db *sql.DB) {
	var activity models.ActivityCreate
	if err := c.BindJSON(&activity); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	if err := database.AddActivity(activity, db); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	c.IndentedJSON(http.StatusOK, activity)
}

func addActivityInterest(c *gin.Context, db *sql.DB) {
	var interest models.Activityinterests
	if err := c.BindJSON(&interest); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	if err := database.AddActivityInterest(interest, db); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	c.IndentedJSON(http.StatusOK, interest)
}

func addActivityGender(c *gin.Context, db *sql.DB) {
	var gender models.Activitygender
	if err := c.BindJSON(&gender); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	if err := database.AddActivityGender(gender, db); err != nil {
		fmt.Print(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": http.StatusBadRequest})
		return
	}
	c.IndentedJSON(http.StatusOK, gender)
}

func getAllActivies(c *gin.Context, db *sql.DB) {
	activies, err := database.GetAllActivies(db)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Query failed."})
		return
	}

	if len(activies) == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "No activities found."})
		return
	}
	c.IndentedJSON(http.StatusOK, activies)

}



func Api(database *sql.DB) {
	// Start router
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"}, // Allows all origins
		// For specific origins, replace "*" with your origin, e.g., "http://localhost:3000"
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowWildcard:    true,
	}))

	// ---------- Example requests ---------- //
	// POST request
	// router.POST("/users", createUser)

	// Patch request
	// Pay with curl "localhost:8080/pay?id=2" --request "PATCH"
	// router.PATCH("/pay", payMoney)

	// GET request
	// router.GET("/users", getUsers)

	// GET request with path parameter to id
	// curl localhost:8080/users/2
	//router.GET("/users/:id", userById)

	// ---------- Database requests ---------- //

	router.GET("/user/:id", func(c *gin.Context) {
		// Call getUsers with the database parameter
		userById(c, database)
	})

	router.GET("/message/:id", func(c *gin.Context) {
		// Call getUsers with the database parameter
		messageById(c, database)
	})

	// get activitId by UserId
	router.GET("/allactivitid/:userId", func(c *gin.Context) {
		activityIdByUserID(c, database)
	})

	router.GET("/messagehistory/:activityId", func(c *gin.Context) {
		messageByActivityId(c, database)
	})

	router.GET("/matchedusers/:matchId", func(c *gin.Context) {
		matchedUsersByMatchId(c, database)
	})

	router.GET("/location/:userId", func(c *gin.Context) {
		locationByUserId(c, database)
	})

	router.GET("/interests/:userId", func(c *gin.Context) {
		interestsByUserId(c, database)
	})

	router.GET("/activityinterests/:activityId", func(c *gin.Context) {
		activityInterestsByActivityId(c, database)
	})

	router.GET("/activity/:activityId", func(c *gin.Context) {
		activityByID(c, database)
	})

	router.GET("/activitygender/:activityId", func(c *gin.Context) {
		activityGenderByActivityId(c, database)
	})

	router.POST("/login", func(c *gin.Context) {
		login(c, database)
	})

	router.POST("/createUser", func(c *gin.Context) {
		createUser(c, database)
	})

	router.POST("/sendmessage", func(c *gin.Context) {
		sendMessage(c, database)
	})

	router.POST("/adduserinterest", func(c *gin.Context) {
		AddUserInterest(c, database)
	})

	router.POST("/addactivityinterest", func(c *gin.Context) {
		addActivityInterest(c, database)
	})

	router.POST("/addactivitygender", func(c *gin.Context) {
		addActivityGender(c, database)
	})

	router.GET("/protected", authenticateJWT(), func(c *gin.Context) {
		getProtectedData(c)
	})

	router.POST("/addactivity", func(c *gin.Context) {
		addActivity(c, database)
	})

	router.POST("/matchuser", func(c *gin.Context) {
		addMatchedUser(c, database)
	})

	router.GET("/allactivities", func(c *gin.Context) {
		getAllActivies(c, database)
	})

	router.POST("/verifyJWT", func(c *gin.Context) {
		authenticateJWTSingle(c)
	})

	// Launch router
	//localhost:8080
	router.Run()

}
