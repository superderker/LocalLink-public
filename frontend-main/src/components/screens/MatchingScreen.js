import * as React from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import * as API from "../../services/api_backend"

let activites;
fetch("https://api-ovtmrhypiq-ew.a.run.app/allactivities")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    activites = response;
  });


export function MatchingScreen() {
  // Load event data from a local JSON file
  const test_data_single_event = require("../../single_event_response.json");
  const [currActivityDate, setCurrActivityDate] = useState("");
  const [currNumberParticipants, setCurrNumberParticipants] = useState("");
  const [currMaxNumberParticipants, setMaxCurrActivityDate] = useState("");
  const [currCreatorID, setCurrCreatorID] = useState("");
  const [currTitle, setCurrTitle] = useState("");
  const [currAddress, setCurrAddress] = useState("");
  const [currIndex, setCurrIndex] = useState(0);


  
  const getActivities= async () =>{
    //activites = await API.getAllActivities();
    //console.log(activites[currIndex].activitydate);
    setCurrActivityDate(activites[currIndex].activitydate);
    setCurrNumberParticipants(activites[currIndex].currentnumberparticipants);
    setMaxCurrActivityDate(activites[currIndex].maxnumberparticipants);
    setCurrCreatorID(activites[currIndex].creatorid);
    setCurrAddress(activites[currIndex].address);
    setCurrTitle(activites[currIndex].title);
  }

  if(currIndex==activites.length){
    setCurrIndex(activites.length-1);
  }

  // Define styles for the component
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,  // Added padding around the container for better spacing
      backgroundColor: "#191414" // Set the background color for the whole screen
    },
    infoBox: {
      flex: 1, // Allows the box to take up all available space, adjusted with margin
      borderWidth: 3,
      borderColor: "#e9b4b4",
      borderRadius: 10,
      padding: 20,  // Consistent padding inside the box
      margin: 30,  // Increased margin around the box to make it slightly smaller
      justifyContent: 'space-around', // Distributes children evenly
      backgroundColor: '#d9d9d9' // Set the background color for the info box
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: 'space-between',
      marginHorizontal: 20,  // Ensures horizontal spacing for the button container
      marginBottom: 20,  // Increases space at the bottom to keep buttons from the edge
    },
    buttonStyle: {
      borderRadius: 50,
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center'
    },
    noButton: {
      backgroundColor: '#d9d9d9',
      marginRight: 60,  // Right margin to space out the buttons
    },
    yesButton: {
      backgroundColor: '#e9b4b4',
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 20, // Smaller font size to ensure it fits
      textAlign: 'center'  // Ensures that the title is centered
    },
    addressText: {
      fontSize: 16, // Smaller font size to ensure it fits
      textAlign: 'center'  // Ensures that the address is also centered, if necessary
    },
    iconBackground: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
    },
    eventDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5, // Reduced margin to save space
    }
  });

  //getActivities();
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.infoBox}>
        {/* Displaying event title and address from JSON, now centered */}
        <Text style={styles.titleText}>{activites[currIndex].title}</Text>
        <Text style={styles.addressText}>{activites[currIndex].address}</Text>
        {/* Adding image */}

        <Image source={require("../../assets/images/event_placeholder.jpeg")} style={{ width:250, height: 150 }} />
        <View style={{ borderBottomColor: "black", borderBottomWidth: 1, marginVertical: 5 }} />
        {/* Dynamic rendering of event details */}
        <View style={{ paddingTop: 5 }}>
          <View style={styles.eventDetails}>
            <View style={styles.iconBackground}>
              <Ionicons name="calendar" size={40} color="blue" />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 16 }}>{activites[currIndex].activitydate}</Text>
            </View>
          </View>
          <View style={styles.eventDetails}>
            <View style={styles.iconBackground}>
              <Ionicons name="people" size={40} color="blue" />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 16 }}>
                {activites[currIndex].currentnumberparticipants} / {activites[currIndex].maxnumberparticipants}
              </Text>
            </View>
          </View>
          <View style={[styles.eventDetails, { paddingTop: 5 }]}>
            <View style={styles.iconBackground}>
              <Ionicons name="people-circle" size={40} color="orange" />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 16 }}>
                CreatorID: {activites[0].creatorid}
              </Text>
              <Text style={{ fontSize: 10, color: "grey" }}>Arrangör</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/* Touchable buttons with icon instead of text */}
        <TouchableOpacity style={[styles.buttonStyle, styles.noButton]} onPress={() => setCurrIndex(updateIndex(currIndex))}>
          <Ionicons name="close" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.yesButton]} onPress={() => setCurrIndex(updateIndex(currIndex))}>
          <Ionicons name="checkmark" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const updateIndex= (currIndex) =>{
    if(currIndex>=activites.length-1){
      const returnVal=activites.length-1;
      return returnVal;
    }
    currIndex=currIndex+1;
    return currIndex;
}
