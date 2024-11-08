import * as React from "react";
import { StyleSheet, View, Platform, Text } from "react-native";
// FIXME:
// Detta är en superscuffed lösning och tror inte man ens behöver det.
// Verkar som appen fungerar fint ändå på webben men risken finns att den krashade utan.
// Eftersom vi gör en mobilapp är det fine men försök inte debugga eller fixa nåt av mappen
// när den renderas på webben då det kommer att krasha, resten av sidorna fungerar troligtvis.
//
// TODO: Lägg in API nyckel där den behövs, osäker var man lägger in den atm.
// https://docs.expo.dev/versions/latest/sdk/map-view/
const isWeb = Platform.OS === "web";
let MapView;
if (!isWeb) {
  MapView = require("react-native-maps").default;
  Marker = require("react-native-maps").Marker;
}
let test_data;
fetch("https://api-ovtmrhypiq-ew.a.run.app/allactivities")
  .then((response) => response.json())
  .then((response) => {
    test_data = response;
  });

function createMarkersList(response, navigation) {
  return response.map((item, index) => {
    return (
      <Marker
        key={index + "marker"}
        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
        onPress={() => {
          navigation.navigate("EventScreen", { eventID: item.activityID });
        }}
      />
    );
  });
}

export function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {isWeb ? (
        <Text style={styles.text}>Maps are not available on web.</Text>
      ) : (
        <MapView style={styles.map}>
          {createMarkersList(test_data, navigation)}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
