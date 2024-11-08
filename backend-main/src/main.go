package main

// Author LocalLink2.2
import (
	//"fmt"

	"main/database"
	//"src/models"
	"main/api"
)

func main() {

	var db = database.ConnectDataBase()
	//var user models.User = database.GetUser("1", db)
	//fmt.Printf("User: %+v\n", user)
	api.Api(db)

	// database.CloseDataBase(db)

}
