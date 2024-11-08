package models

type User struct {
	Userid      string `json:"userid"`
	Username    string `json:"username"`
	Displayname string `json:"displayname"`
	Dob         string `json:"dob"`
	Email       string `json:"email"`
	Gender      string `json:"gender"`
	Name        string `json:"name"`
	Password    string `json:"password"`
}

type UserCreate struct {
	Username    string `json:"username"`
	Displayname string `json:"displayname"`
	Dob         string `json:"dob"`
	Email       string `json:"email"`
	Gender      string `json:"gender"`
	Name        string `json:"name"`
	Password    string `json:"password"`
}

type Message struct {
	Messageid      string `json:"messageid"`
	Sendername     string `json:"sendername"`
	Matchid        string `json:"matchid"`
	Messagecontent string `json:"messagecontent"`
	Messagetime    string `json:"messagetime"`
}

type SendMessage struct {
	Senderid       int    `json:"senderid"`
	Activityid     int    `json:"activityid"`
	Messagecontent string `json:"messagecontent"`
}

type Matchedusers struct {
	Activityid string `json:"activityid"`
	Matcheeid  string `json:"matcheeid"`
}

type Location struct {
	Userid  string `json:"userid"`
	Country string `json:"country"`
	City    string `json:"city"`
}

type Interests struct {
	Userid    string `json:"userid"`
	Interests string `json:"interests"`
}

type Activityinterests struct {
	Activityid string `json:"activityid"`
	Interests  string `json:"interests"`
}

type Activitygender struct {
	Activityid string `json:"activityid"`
	Gender     string `json:"gender"`
}

type Activity struct {
	Activityid                string `json:"activityid"`
	Creatorid                 string `json:"creatorid"`
	Title                     string `json:"title"`
	Paid                      string `json:"paid"`
	MaxNumberParticipants     string `json:"maxnumberparticipants"`
	CurrentNumberParticipants string `json:"currentnumberparticipants"`
	Activitydate              string `json:"activitydate"`
	Latitude                  string `json:"latitude"`
	Longitude                 string `json:"longitude"`
	Upperage                  string `json:"upperage"`
	Lowerage                  string `json:"lowerage"`
	CreationDate              string `json:"creationdate"`
	Address                   string `json:"address"`
	Description               string `json:"description"`
	Cost                      string `json:"cost"`
	Duration                  string `json:"duration"`
}

type ActivityCreate struct {
	Creatorid                 string `json:"creatorid"`
	Title                     string `json:"title"`
	Paid                      string `json:"paid"`
	MaxNumberParticipants     string `json:"maxnumberparticipants"`
	Activitydate              string `json:"activitydate"`
	Latitude                  string `json:"latitude"`
	Longitude                 string `json:"longitude"`
	Upperage                  string `json:"upperage"`
	Lowerage                  string `json:"lowerage"`
	Address                   string `json:"address"`
	Description               string `json:"description"`
	Cost                      string `json:"cost"`
	Duration                  string `json:"duration"`
}
