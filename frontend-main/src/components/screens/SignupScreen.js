import React from "react";
import AuthContext from "../../AuthContext";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ButtonGroup } from "react-native-elements";
import { createUser } from "../../services/api_backend";

export const SignupScreen = ({ navigation }) => {
  
  // DATA
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [dob, setDob] = React.useState(new Date());
  const [gender, setGender] = React.useState("O");

  const buttons = ["Other", "Man", "Woman"];
  const selectedIndex =
    gender === "O" ? 0 : gender === "M" ? 1 : gender === "F" ? 2 : -1;
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  // ACCOUNT CREATION

  // Check if form is valid and create account
  const handleCreateAccount = async () => {
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    const message = validateForm(
      email,
      username,
      fullName,
      displayName,
      password1,
      password2,
      dob,
      gender
    );
    console.log(errorMessage);
    console.log(message);
    if (errorMessage
    ) {
      setErrorMessage("Account creation failed");
    } else {
      setSuccessMessage("Account created successfully!");
    }
    clearAccountDetails();
  };

  // Clear account details if user has created an account
  const clearAccountDetails = () => {
    setEmail("");
    setUsername("");
    setPassword1("");
    setPassword2("");
    setDisplayName("");
    setFullName("");
    setDob(new Date());
    setGender("O");
  };

  // VIEW OF SIGN UP SCREEN
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Fill in details to create an account</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setEmail}
            value={email}
            placeholder="email"
            placeholderTextColor="#888888"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setUsername}
            value={username}
            placeholder="username"
            placeholderTextColor="#888888"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setFullName}
            value={fullName}
            placeholder="full name"
            placeholderTextColor="#888888"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setDisplayName}
            value={displayName}
            placeholder="display name"
            placeholderTextColor="#888888"
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setPassword1}
            value={password1}
            placeholder="password"
            placeholderTextColor="#888888"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setPassword2}
            value={password2}
            placeholder="re-enter password"
            placeholderTextColor="#888888"
            secureTextEntry={true}
          />
          {password1 !== password2 && password2.length > 0 && (
            <Text style={{ color: "red" }}>Passwords do not match</Text>
          )}

          <Text style={styles.nonTitleFont}>Gender</Text>

          <ButtonGroup
            onPress={(selectedIndex) => {
              setGender(
                selectedIndex === 0 ? "O" : selectedIndex === 1 ? "M" : "F"
              );
            }}
            selectedIndex={selectedIndex}
            buttons={buttons}
            selectedButtonStyle={{ backgroundColor: "#e9b4b4" }}
            containerStyle={styles.buttonGroupStyle}
          />

          <Text style={styles.nonTitleFont}>Date of birth</Text>

          {Platform.OS === "web" ? (
            <DatePicker
              selected={dob}
              onChange={(date) => {
                setDob(date);
              }}
              dateFormat="MM/dd/yyyy"
              showYearDropdown
              showMonthDropdown
            />
          ) : (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || dob;
                setDob(currentDate);
              }}
              style={styles.datePicker}
            />
          )}

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={handleCreateAccount}
          >
            <Text style={styles.btnText}>Create account</Text>
          </TouchableOpacity>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : (
            <Text style={styles.successText}>{successMessage}</Text>
          )}

          <TouchableOpacity
            style={styles.btnContainerSmall}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.underlineText}>Go back to login here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// FUNCTIONS

// ------------------- DoB -------------------

let DatePicker;
if (Platform.OS === "web") {
  DatePicker = require("react-datepicker").default;
}

// ------------------- Validate data -------------------

const validateForm = (
  email,
  username,
  fullName,
  displayName,
  password1,
  password2,
  dob,
  gender
) => {
  if (existingUserEmail(email)) {
    return "Email already exists, proceed to login";
  }
  if (!email.includes("@") || email.length < 3) {
    return "Invalid email";
  }
  if (email.length > 40) {
    return "Email is too long";
  }

  if (existingUsername(username)) {
    return "Username is taken, please choose another one";
  }
  if (username.length > 20) {
    return "Username is too long";
  }

  if (fullName.length > 30) {
    return "full name is too long";
  }
  if (displayName.length > 20) {
    return "display name is too long";
  }

  if (password1.length < 6 || password1.length > 60) {
    return "Password must be between 6 and 60 characters";
  }

  if (password1 !== password2) {
    return "Passwords do not match";
  }

  if (!validateDOB(dob)) {
    return "Invalid date of birth";
  }

  if (!validateDOBAbove18(dob)) {
    return "You must be above 18 years old to sign up";
  }

  if (
    !formIsFilled(email, username, fullName, displayName, password1, password2)
  ) {
    return "Please fill out all fields";
  }

  console.log(email.toLowerCase());
  createNewUser(
    email.toLowerCase(),
    username,
    fullName,
    displayName,
    password1,
    gender,
    dob
  );
  return;
};

// return true if user is above 18 years old
const validateDOBAbove18 = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    return false;
  }
  return true;
};

// return true if DOB above 1900
const validateDOB = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  const minDate = new Date(1900, 0, 1); // January 1, 1900

  if (birthDate > today || birthDate < minDate) {
    return false;
  }
  return true;
};

const formIsFilled = (
  email,
  username,
  fullName,
  displayName,
  password1,
  password2
) => {
  if (
    !email ||
    !username ||
    !fullName ||
    !displayName ||
    !password1 ||
    !password2
  ) {
    return false;
  }
  return true;
};

// ------------------- Query Database -------------------

const existingUserEmail = (email) => {
  // Check if email exists in database
  return false;
};

const existingUsername = (username) => {
  // Check if email exists in database
  return false;
};

// Check for error messages when insering user into database
const createNewUser = (
  email,
  username,
  fullName,
  displayName,
  password,
  gender,
  dob
) => {
  dobString = dobAsString(dob);

  const user = JSON.stringify({
    Username: username,
    DisplayName: displayName,
    DoB: dobString,
    Email: email,
    Gender: gender,
    Name: fullName,
    Password: password,
    Description: "",
  });

  

  createUser(user)
    .then((response) => {
      if (response.status === 400) {
        this.setErrorMessage("Bad request");
      } else {
        return response.json();
      }
    })
    .then((data) => {});
  return;
};

// Get date of birth as string format: yyyy-mm-dd
const dobAsString = (dob) => {
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

// STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", //spt
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 20,
    textShadowColor: "#e9b4b4",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "System", // default to system font
    textAlign: "center",
  },
  input: {
    width: 100,
    backgroundColor: "#333333",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 18,
    fontFamily: "System",
  },
  nonTitleFont: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
    textShadowColor: "#e9b4b4",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "System",
    textAlign: "center",
  },
  btnContainer: {
    backgroundColor: "#e9b4b4",
    padding: 15,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  btnContainerSmall: {
    backgroundColor: "#e9b4b4",
    padding: 10,
    borderRadius: 15,
    width: "40%",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
  successText: {
    color: "green",
    fontSize: 16,
    marginTop: 10,
  },
  inputText: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#333333",
    borderColor: "#e9b4b4",
    borderRadius: 15,
    color: "#FFFFFF",
  },
  underlineText: {
    textDecorationLine: "underline",
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  picker: {
    height: 40,
    width: 150,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  datePicker: {
    backgroundColor: "#e9b4b4",
    alignItems: "center",
  },
  buttonGroupStyle: {
    height: 40,
    width: 250,
    borderWidth: 1,
    padding: 1,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: "#333333",
    borderColor: "#e9b4b4",
  },
  scrollViewStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
