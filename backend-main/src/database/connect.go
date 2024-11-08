package database

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"log"
	"os"
)

func readLoginDetails() string {

	err := godotenv.Load("./envFiles/loginDetails.env")

	if err != nil {
		log.Fatal(err)
	}

	host := os.Getenv("host")
	port := os.Getenv("port")
	user := os.Getenv("username")
	password := os.Getenv("password")
	dbname := os.Getenv("dbname")

	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	return psqlInfo
}

func ConnectDataBase() *sql.DB {

	psqlInfo := readLoginDetails()
	// Open the connection
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	//defer db.Close()

	// Check the connection
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Successfully connected!")
	return db
}

func CloseDataBase(db *sql.DB) {
	db.Close()
}

func Test() {
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal("Error getting current directory: ", err)
	}
	fmt.Println("Current working directory: ", wd)

}

func QuerySingleRow(db *sql.DB) {
	query := "SELECT username FROM users WHERE userid = $1"
	var username string
	err := db.QueryRow(query, 1).Scan(&username) // Assuming you're looking for user with id=1
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No rows were returned!")
		} else {
			log.Fatal(err)
		}
	}
	fmt.Println("Username:", username)
}
