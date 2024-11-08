import React from "react";
import {
  Button,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LoadingScreen } from "./LoadingScreen";
import { Ionicons } from "@expo/vector-icons";

const test_data_single_event = require("../../single_event_response.json");

function getEventData(response, navigation) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.eventContainer}>
        <Image
          source={require("../../assets/images/event_placeholder.jpeg")}
          style={{ width: "100%", height: "20%" }}
        />
        <Text style={styles.titleText}>{response.title}</Text>
        <Text style={styles.addressText}>{response.address}</Text>
        <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }} />
        <View style={{ paddingTop: 30, paddingLeft: 20 }}>
          <View style={styles.eventDetails}>
            <View style={styles.iconBackground}>
              <Ionicons name="calendar" size={50} color="blue" />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 20 }}>{response.activityDate}</Text>
              <Text>Detta ska ändras sen...</Text>
            </View>
          </View>
          <View style={styles.eventDetails}>
            <View style={styles.iconBackground}>
              <Ionicons name="people" size={50} color="blue" />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 20 }}>
                {response.currentNumberParticipants} /{" "}
                {response.maxNumberParticipants}
              </Text>
            </View>
          </View>
          <View style={[styles.eventDetails, { paddingTop: 20 }]}>
            <View style={styles.iconBackground}>
              <Ionicons name="people-circle" size={50} color="orange" />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 20 }}>
                CreatorID: {response.creatorID} Will get changed...
              </Text>
              <Text style={{ fontSize: 10, color: "grey" }}>Arrangör</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            paddingTop: 20,
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold", padding: 5 }}>Om eventet</Text>
          <Text style={{ height: "auto", padding: 5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut sem
            viverra aliquet eget sit amet. Ligula ullamcorper malesuada proin
            libero nunc. Tortor id aliquet lectus proin. Varius quam quisque id
            diam. Sed felis eget velit aliquet sagittis id consectetur.
            Facilisis leo vel fringilla est ullamcorper eget nulla. Interdum
            varius sit amet
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: Dimensions.get("screen").width / 2 - 60,
          marginBottom: 60,
          width: 120,
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#119af5",
          borderRadius: 15,
        }}
      >
        {/* FIXME: Detta borde skrivas om med en TouchableOpacity för att styla knappen bättre */}
        <Button
          title="Jag kommer"
          color="#f7f7f7"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export const EventScreen = ({ navigation }) => {
  const [innerContent, setInnerContent] = React.useState(LoadingScreen);
  let eventID = useRoute().params?.eventID;

  React.useEffect(() => {
    setTimeout(() => {
      setInnerContent(getEventData(test_data_single_event, navigation));
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Button
        styles={styles.closeButton}
        title="Close"
        onPress={() => {
          navigation.goBack();
        }}
      ></Button>
      {innerContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  eventContainer: {
    flex: 1,
    textAlign: "center",
    width: "100%",
    height: 4000,
  },
  closeButton: {
    position: "absolute",
    left: 0,
  },
  titleText: {
    paddingTop: 10,
    fontSize: 30,
    textAlign: "center",
  },
  addressText: {
    fontSize: 15,
    color: "grey",
    textAlign: "center",
    paddingBottom: 10,
  },
  eventDetails: {
    flexDirection: "row",
    paddingTop: 10,
    alignItems: "center",
  },
  iconBackground: {
    backgroundColor: "grey",
    borderRadius: 15,
    padding: 5,
  },
});