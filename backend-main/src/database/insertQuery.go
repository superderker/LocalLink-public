package database

import (
	"database/sql"
	//"log"
	"github.com/alexedwards/argon2id"
	"main/models"
)

func InsertUser(usr models.UserCreate, db *sql.DB) error {

	hashed, er := argon2id.CreateHash(usr.Password, argon2id.DefaultParams)
	if er != nil {
		return er
	}

	_, err := db.Exec("INSERT INTO  users (username, displayname, dob, email, gender, name, password) values ($1, $2, $3, $4, $5, $6, $7)", usr.Username, usr.Displayname, usr.Dob, usr.Email, usr.Gender, usr.Name, hashed)
	if err != nil {
		print("error\n")
		//log.Fatal(err)
	}
	return err
}

func AddUserInterest(interest models.Interests, db *sql.DB) error {
	_, err := db.Exec("INSERT INTO interests values ($1, $2)", interest.Userid, interest.Interests)
	return err
}

func AddActivityInterest(interest models.Activityinterests, db *sql.DB) error {
	_, err := db.Exec("INSERT INTO activityinterests values ($1, $2)", interest.Activityid, interest.Interests)
	return err
}

func AddActivityGender(gender models.Activitygender, db *sql.DB) error {
	_, err := db.Exec("INSERT INTO activitygender values ($1, $2)", gender.Activityid, gender.Gender)
	return err
}

func AddActivity(activity models.ActivityCreate, db *sql.DB) error {
	_, err := db.Exec("INSERT INTO activity (creatorID, title, paid, maxnumberparticipants, activitydate, latitude, longitude, upperage, lowerage, address, description, cost, duration) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
		activity.Creatorid, activity.Title, activity.Paid, activity.MaxNumberParticipants,
		activity.Activitydate, activity.Latitude, activity.Longitude, activity.Upperage, activity.Lowerage, activity.Address,
		activity.Description, activity.Cost, activity.Duration)
	return err
}

func AddMatchedUser(matcheduser models.Matchedusers, db *sql.DB) error {
	_, err := db.Exec("INSERT INTO matchedUsers values ($1, $2)", matcheduser.Activityid, matcheduser.Matcheeid)
	return err
}
