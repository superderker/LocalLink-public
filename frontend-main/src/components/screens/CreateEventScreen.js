import React from "react";
import { Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { createEvent } from "../../services/api_backend";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import{ useState } from 'react';

const API_KEY = "AIzaSyCfkvcY5hu5HYjIa_Vj7hq5bI9UYRumQ_Q";

const categories = ["football", "dance", "gaming", "programming"];

export function CreateEventScreen() {
  const [maxParticipants, setMaxParticipants] = React.useState(0);
  const [upperAge, setUpperAge] = React.useState(999);
  const [lowerAge, setLowerAge] = React.useState(18);
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [cost, setCost] = React.useState(null);
  const [date, setDate] = useState(new Date()); 
  const [duration, setDuration] = React.useState(0);
  const [eventName, setEventName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // Initialize as false

  const handleCreateActivity = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const message = validateForm(
      eventName,
      category,
      maxParticipants,
      upperAge,
      lowerAge,
      description,
      cost
    );
    if (message) {
      setErrorMessage(message);
      console.log("fail");
    } else {
      setSuccessMessage("Activity created successfully!");
      console.log("success");
    }
    console.log([
      eventName,
      category,
      maxParticipants,
      upperAge,
      lowerAge,
      description,
      cost,
      duration
    ]);
    createNewActivity(
      eventName,
      maxParticipants,
      date,
      latitude,
      longitude,
      upperAge,
      lowerAge,
      address,
      description,
      cost,
      duration,
    );
    clearInput();
  };

  const handleSetPlace = async (data, details) => {
    console.log(data?.description);
    console.log(details);
    setLatitude(details?.geometry?.location?.lat);
    setLongitude(details?.geometry?.location?.lng);
    setAddress(data?.description);
  };

  const clearInput = () => {
    setMaxParticipants(0);
    setUpperAge(999);
    setLowerAge(18);
    setAddress("");
    setDescription("");
    setCost(null);
    setDuration(0);
    setEventName("");
    setCategory("");
    setDate(new Date());
  };
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker();
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Fill in details to create an activity</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputText}
            onChangeText={setEventName}
            value={eventName}
            placeholder="Event Name"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setMaxParticipants}
            value={maxParticipants.toString()}
            placeholder="Max Participants"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setUpperAge}
            value={upperAge.toString()}
            placeholder="Upper Age"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setLowerAge}
            value={lowerAge.toString()}
            placeholder="Lower Age"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputText}
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setCost}
            value={cost ? cost.toString() : ""}
            placeholder="Cost"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setDuration}
            value={duration.toString()}
            placeholder="Duration"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <GooglePlacesAutocomplete
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            fetchDetails={true}
            placeholder="Location"
            query={{
              key: API_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              handleSetPlace(data, details);
            }}
            onFail={(error) => console.error(error)}
            styles={{
              container: { flex: 1 },
              textInput: styles.inputText,
            }}
          />
        </View>
        <View style={styles.inputRow}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Text style={styles.datePickerButtonText}>
              {date.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
        <View style={styles.inputRow}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((category) => (
                <Picker.Item key={category} label={category} value={category}
  />
))}
</Picker>
</View>
</View>


<View style={styles.btnContainer}>
<TouchableOpacity onPress={handleCreateActivity}>
<Text style={styles.btnText}>Create Activity</Text>
</TouchableOpacity>
</View>
</View>
{errorMessage ? (
<Text style={styles.errorText}>{errorMessage}</Text>
) : (
<Text style={styles.successText}>{successMessage}</Text>
)}
</SafeAreaView>
);}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputText: {
    width: '48%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    width: '48%', // Adjust width to fit two components in a row
    marginBottom: 16,
  },
  picker: {
    height: 40, // Adjust height for better visibility
    fontSize: 14, // Adjust font size of Picker text
  },
  datePickerButton: {
    width: '48%', // Adjust width to fit two components in a row
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  datePickerButtonText: {
    fontSize: 14, // Adjust font size of date picker text
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items horizontally
    marginTop: 20,
    marginHorizontal: 250, // Adjust padding to fit smaller text

  },
  btnText: {
    backgroundColor: '#e9b4b4',
    color: '#fff',
    paddingVertical: 10, // Adjust padding to fit smaller text
    paddingHorizontal: 20, // Adjust padding to fit smaller text
    borderRadius: 8,
    fontSize: 14, // Adjust font size of button text
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },
};

const validateForm = (

  title,
  maxNumberParticipants,
  location,
  upperAge,
  lowerAge,
  description,
  cost,
) => {

  if (!formIsFilled(title,  maxNumberParticipants, location, upperAge, lowerAge, description, cost)) {
    return "Please fill in all the required fields.";
  }

  // if (!isValidDate(activitydate)) {
  //   return "Invalid activity date.";
  // }

  if (!isValidAgeRange(upperAge, lowerAge)) {
    return "Invalid age range.";
  }

  // Add more validation checks if needed
  console.log("slutet");
  return ""; // Return empty string if all validations pass
};


const isValidDate = (date) => {
  const currentDate = new Date();
  const selectedDate = new Date(date);
  return selectedDate >= currentDate;
};

const isValidAgeRange = (upperAge, lowerAge) => {
  return upperAge >= lowerAge;
}

const formIsFilled = (
  title,
  maxNumberParticipants,
  location,
  upperAge,
  lowerAge,
  description,
  cost,
) => {
  if (
    !title ||
    !maxNumberParticipants ||
    !location ||
    !upperAge ||
    !lowerAge || // Remove the extra comma
    !description ||
    !cost
  ) {
    return false;
  }
  return true;
};

const createNewActivity = async (
  title,
  maxNumberParticipants,
  activitydate,
  latitude,
  longitude,
  upperAge,
  lowerAge,
  address,
  description,
  cost,
  duration,
) => {
  const paidBool = !(cost<1 && cost!=null);
  console.log(dobAsString(activitydate));
  const activity = JSON.stringify({
    CreatorID: "1",
    Title: title.toString(),
    Paid: paidBool.toString(),
    MaxNumberParticipants: maxNumberParticipants.toString(),
    Activitydate: dobAsString(activitydate),
    Latitude: latitude.toString(),
    Longitude: longitude.toString(),
    UpperAge: upperAge.toString(),
    LowerAge: lowerAge.toString(),
    Address: address.toString(),
    Description: description.toString(),
    Cost: cost.toString(),
    Duration: duration.toString(),
  });
  
  console.log(activity);
  console.log("activity.json()");

  console.log("time for insert");
  await createEvent(activity)
    .then((response) => {
      console.log(response.ok);
    })
    .catch((error) => {
      console.error(error);
    });
};

const dobAsString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + "-" + month + "-" + day
};
