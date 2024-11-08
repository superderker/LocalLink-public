package database

import (
	//"src/main"
	"database/sql"
	//"fmt"
	_ "github.com/lib/pq"
	"log"
	"main/models"
	//"os"
)

func SendMessage(message models.SendMessage, db *sql.DB) error {

	_, err := db.Exec("INSERT INTO message (senderID, activityID, messagecontent) values ($1, $2, $3)", message.Senderid, message.Activityid, message.Messagecontent)
	if err != nil {
		log.Printf("Error inserting message: %v", err)
	}
	return err
}

// for chatfunction
func GetMessageByActivityID(activityid string, db *sql.DB) ([]models.Message, error) {
	var messages []models.Message

	rows, err := db.Query("SELECT m.messageID, u.username, m.activityID, m.messagecontent, m.messagetime FROM message m JOIN matchedUsers mu ON m.activityID = mu.activityID AND m.senderID = mu.matcheeID JOIN users u ON mu.matcheeID = u.userID WHERE m.activityID = $1;", activityid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var message models.Message
		err := rows.Scan(&message.Messageid, &message.Sendername, &message.Matchid, &message.Messagecontent, &message.Messagetime)
		if err != nil {
			return nil, err
		}
		messages = append(messages, message)
	}

	// Check for errors encountered during iteration
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return messages, nil
}

func GetActivityIdByUserID(userid string, db *sql.DB) ([]string, error) {
	var activityids []string

	rows, err := db.Query("SELECT activityid FROM matchedUsers WHERE matcheeID = $1;", userid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var activityid string
		err := rows.Scan(&activityid)
		if err != nil {
			return nil, err
		}
		activityids = append(activityids, activityid)
	}

	return activityids, nil
}
