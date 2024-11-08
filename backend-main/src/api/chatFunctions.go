package api

import (
	"database/sql"
	"errors"
	"github.com/gin-gonic/gin"
	"main/database"
	"main/models"
	"net/http"
)

// ----------- MESSAGES ---------- //

func messageById(c *gin.Context, db *sql.DB) {
	id := c.Param("id")
	message, err := getMessageById(id, db)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Message not found."}) // gin.H allows us to write custom txt
		return
	}
	c.IndentedJSON(http.StatusOK, message)
}

func getMessageById(id string, db *sql.DB) (*models.Message, error) {
	message, err := database.GetMessage(id, db)

	if err != nil {
		return nil, errors.New("message not found")
	}

	return &message, nil
}

// for chat function
func messageByActivityId(c *gin.Context, db *sql.DB) {
	activityId := c.Param("activityId")
	messages, err := getMessageByActivityID(activityId, db)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Messages not found."})
		return
	}

	if len(messages) == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "No messages found for this activity ID."})
		return
	}

	c.IndentedJSON(http.StatusOK, messages)
}

func getMessageByActivityID(activityId string, db *sql.DB) ([]models.Message, error) {
	messages, err := database.GetMessageByActivityID(activityId, db)
	if err != nil {
		return nil, err
	}
	if len(messages) == 0 {
		return nil, errors.New("no messages found")
	}
	return messages, nil
}

func activityIdByUserID(c *gin.Context, db *sql.DB) {

	userId := c.Param("userId")

	/* if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found"})
		return
	}

	userId := userIdAny.(string) */

	activityId, err := getActivityIdByUserID(userId, db)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "ActivityId not found"})
		return
	}
	c.IndentedJSON(http.StatusOK, activityId)
}

func getActivityIdByUserID(activityId string, db *sql.DB) (*[]string, error) {
	activityIds, err := database.GetActivityIdByUserID(activityId, db)

	if err != nil {
		return nil, errors.New("ActivityId not found")
	}

	return &activityIds, nil
}
