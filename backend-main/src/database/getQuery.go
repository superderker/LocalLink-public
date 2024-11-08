package database

import (
	//"src/main"
	"database/sql"
	//"fmt"
	"main/models"

	"github.com/alexedwards/argon2id"
	_ "github.com/lib/pq"
	//"log"
	//"os"
)

func GetUser(userid string, db *sql.DB) (models.User, error) {

	var user models.User

	err := db.QueryRow("SELECT userid, username, dob, email, gender, name FROM users WHERE userid = $1", userid).Scan(&user.Userid, &user.Username, &user.Dob, &user.Email, &user.Gender, &user.Name)

	user.Dob = subString(user.Dob, 10)
	if err != nil {
		return user, err
	}

	return user, nil
}

func GetUsernameByMail(mail string, db *sql.DB) (string, error) {
	var username string
	err := db.QueryRow("SELECT username FROM users WHERE email = $1", mail).Scan(&username)
	if err != nil {
		return "", err
	}
	return username, nil
}

func GetUseridByUsername(username string, db *sql.DB) (string, error) {
	var userid string
	err := db.QueryRow("SELECT userid  FROM users WHERE username = $1", username).Scan(&userid)

	if err != nil {
		return userid, err
	}

	return userid, nil

}

func GetMessage(messageid string, db *sql.DB) (models.Message, error) {

	var message models.Message

	err := db.QueryRow("SELECT messageid, senderid, matchid, messagecontent, messagetime FROM message WHERE messageid = $1", messageid).Scan(&message.Messageid, &message.Sendername, &message.Matchid, &message.Messagecontent, &message.Messagetime)

	if err != nil {
		return message, err
	}

	return message, nil
}

func GetMatchedusers(activityid string, db *sql.DB) (models.Matchedusers, error) {

	var matchedusers models.Matchedusers

	err := db.QueryRow("SELECT matchid, activityid FROM matchedusers WHERE matchid = $1", activityid).Scan(&matchedusers.Activityid, &matchedusers.Matcheeid)

	if err != nil {
		return matchedusers, err
	}

	return matchedusers, nil
}

func GetLocation(userid string, db *sql.DB) (models.Location, error) {

	var location models.Location

	err := db.QueryRow("SELECT userid, country, city FROM location WHERE userid = $1", userid).Scan(&location.Userid, &location.Country, &location.City)

	if err != nil {
		return location, err
	}

	return location, nil
}

func GetInterests(userid string, db *sql.DB) (models.Interests, error) {

	var interests models.Interests

	err := db.QueryRow("SELECT userid, interests FROM interests WHERE userid = $1", userid).Scan(&interests.Userid, &interests.Interests)

	if err != nil {
		return interests, err
	}

	return interests, nil
}

func GetActivityInterests(activityid string, db *sql.DB) (models.Activityinterests, error) {

	var activityinterests models.Activityinterests

	err := db.QueryRow("SELECT activityid, interests FROM activityinterests WHERE activityid = $1", activityid).Scan(&activityinterests.Activityid, &activityinterests.Interests)

	if err != nil {
		return activityinterests, err
	}

	return activityinterests, nil
}

func GetActivityGender(activityid string, db *sql.DB) (models.Activitygender, error) {

	var activitygender models.Activitygender

	err := db.QueryRow("SELECT activityid, gender FROM activitygender WHERE activityid = $1", activityid).Scan(&activitygender.Activityid, &activitygender.Gender)

	if err != nil {
		return activitygender, err
	}

	return activitygender, nil
}

func GetActivity(activityid string, db *sql.DB) (models.Activity, error) {

	var activity models.Activity
	var cost sql.NullString
	err := db.QueryRow("SELECT activityid, creatorid, title, paid, maxnumberparticipants, currentnumberparticipants, activitydate, latitude, longitude, upperage, lowerage, creationdate, address, description, cost, duration FROM activity WHERE activityid = $1", activityid).Scan(&activity.Activityid, &activity.Creatorid, &activity.Title, &activity.Paid, &activity.MaxNumberParticipants, &activity.CurrentNumberParticipants, &activity.Activitydate, &activity.Latitude, &activity.Longitude, &activity.Lowerage, &activity.Upperage, &activity.CreationDate, &activity.Address, &activity.Description, &cost, &activity.Duration)
	if cost.Valid {
		activity.Cost = cost.String
	} else {
		activity.Cost = ""
	}
	activity.Activitydate = subString(activity.Activitydate, 10)
	activity.CreationDate = subString(activity.CreationDate, 10)

	if err != nil {
		return activity, err
	}

	return activity, nil
}

func GetAllActivies(db *sql.DB) ([]models.Activity, error) {
	var activies []models.Activity
	rows, err := db.Query("SELECT * FROM activity;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var activity models.Activity
		var cost sql.NullString
		err := rows.Scan(&activity.Activityid, &activity.Creatorid, &activity.Title, &activity.Paid,
			&activity.MaxNumberParticipants, &activity.CurrentNumberParticipants, &activity.Activitydate, &activity.Latitude, &activity.Longitude,
			&activity.Upperage, &activity.Lowerage, &activity.CreationDate, &activity.Address, &activity.Description, &cost, &activity.Duration)
		if err != nil {
			return nil, err
		}
		if cost.Valid {
			activity.Cost = cost.String
		} else {
			activity.Cost = ""
		}
		activity.Activitydate = subString(activity.Activitydate, 10)
		activity.CreationDate = subString(activity.CreationDate, 10)
		activies = append(activies, activity)
	}
	// Check for errors encountered during iteration
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return activies, nil
}

func CheckCredentials(username string, password string, db *sql.DB) (bool, error) {
	var hashedPassword string
	err := db.QueryRow("SELECT password FROM users WHERE username = $1", username).Scan(&hashedPassword)
	if err != nil {
		// It might be useful to distinguish between sql.ErrNoRows and other errors
		return false, err
	}
	// Use bcrypt to compare the hashed password stored in the database with the password provided by the user
	match, err := argon2id.ComparePasswordAndHash(password, hashedPassword)
	if err != nil {
		return false, err
	}
	return match, nil
}

func subString(str string, n int) string {
	v := []rune(str)
	if n >= len(v) {
		return str
	}
	return string(v[:n])
}
