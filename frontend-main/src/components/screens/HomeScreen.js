import * as React from "react";
import * as API from "../../services/api_backend"
import { Text, View, ScrollView, StyleSheet, Image, ImageBackground, Button, TouchableOpacity, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const tennisImg = require("../../assets/images/image1.png");
const chessImg = require("../../assets/images/image2.png");
const programmingImg = require("../../assets/images/image3.png");
const profileImg = require("../../assets/images/profile1.png");


export const HomeScreen = ({ navigation }) => {
//a = await API.getValueFor("user");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#191414"}}>
      <View style={styles.topBar}>
        <TouchableOpacity className="pl-5" onPress={() => navigation.navigate("ChatScreen")}>
          <Ionicons name="mail" color={"#e9b4b4"} size={50}></Ionicons>
        </TouchableOpacity>
        <View style={styles.leftRectangle}>
          <Text style={styles.leftText}>LOCALLINK</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.rightCircle}>
          <ImageBackground
            source={profileImg}
            style={{
              width: '100%', // Adjust the width to make it slightly smaller
              height: '90%', // Adjust the height to make it slightly smaller
            }}
          >
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.mainView}>
        <View style={styles.activitiesText}>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} >
            <Text style={styles.activitiesTitle}>
              Activities
            </Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.middleCircles}>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.circle}>
            <Image source={tennisImg} style={styles.imgCircle}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.circle}>
            <Image source={chessImg} style={styles.imgCircle}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.circle}>
            <Image source={programmingImg} style={styles.imgCircle}/>
          </TouchableOpacity>

        </View>
        <View style={styles.textPart}>
            <Text style={styles.text}>
              Info about activities...
            </Text>
          </View>
        <View style={styles.activitiesText}>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} >
            <Text style={styles.activitiesTitle}>
              Communities
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.largeRectangle}>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.communitiesTitle} >
            <Text>
              Community 1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.communitiesTitle} >
            <Text>
              Community 2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.communitiesTitle} >
            <Text>
              Community 3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.communitiesTitle} >
            <Text>
              Community 4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.communitiesTitle} >
            <Text>
              Community 5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EventScreen")} style={styles.communitiesTitle} >
            <Text>
              Community 6
            </Text>
          </TouchableOpacity>
        </View>
          <View style={styles.textPart}>
            <Text style={styles.text}>
              Info about communities...
            </Text>
          </View>
        <View>
        <Text style = {styles.activitiesTitle}>
          Contact
        </Text>
        <Text style = {styles.text}>
          Contact info for company...
        </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  topBar: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically
    backgroundColor: "#191414",
    borderBottomWidth: 1, // Border line width
    borderBottomColor: "white", // Border line color
  },
  leftRectangle: {
    height: "50%", // Take up full height of the top bar
    flex: 1, // Fill up remaining width
    backgroundColor: "#e9b4b4",
    marginLeft: 20,
    justifyContent: "center", // Center text vertically
    alignItems: "center",
    borderRadius: 25,
  },
  leftText: {
    fontSize: 25,
    color: 'white', // Set text color
    fontWeight: "bold", // Set text to bold
    marginLeft: -5,
  },
  rightCircle: {
    height: "75%", // Fixed width
    aspectRatio: 1,
    borderRadius: 999, // Make it a circle
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  mainView: {
    padding: 10,
    margin: 20,
    marginBottom: 200,
  },
  middleCircles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 20,
  },
  circle: {
    width: "28%", // Take up 1/3 of horizontal space
    aspectRatio: 1, // Ensure circles maintain aspect ratio
    backgroundColor: "gray",
    borderRadius: 999, // Make it a circle
    borderWidth: 3,
    borderColor: "#e9b4b4",
    justifyContent: "center",
    alignItems: "center"
  },
  largeRectangle: {
    height: 250,
    backgroundColor: "#191414",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignContent: "space-around"
  },
  text: {
    paddingTop: 20,
    color: "white"
  },
  bottomCenterText: {
    position: "absolute",
    bottom: -0,
    left: 0,
    right: 0,
    textAlign: "center",
    marginBottom: 0, // Adjust the marginBottom as needed
    color: "black", // Adjust text color if needed
    fontSize: 14, // Adjust font size if needed
    // You can add more styles as needed
  },
  activitiesText: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    color: "#e9b4b4",
  },
  activitiesTitle: {
    fontSize: 40,
    // fontStyle: "italic", // Make the text cursive
    // textDecorationLine: "underline", // Add underline
    textAlign: "center",
    color: "#e9b4b4",
    fontFamily: "Georgia",
    fontWeight: "bold",
  },
  imgCircle: {
    height: "100%",
    aspectRatio: 1,
    borderRadius: 999,
  },
  textPart: {
    marginBottom: 50,
    color: "white",
  },
  communitiesTitle: {
    height: "40%",
    aspectRatio: 1,
    backgroundColor: "#e9b4b4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    color: "#1DB954",
  },
  communityTitle: {
    fontSize: 42,
    fontStyle: "italic", // Make the text cursive
    // textDecorationLine: "underline", // Add underline
    textAlign: "center",
    marginTop: 40,
    color: "#1DB954",
  },
  nativeTest: {
    fontSize: 50,
  },
  
});
