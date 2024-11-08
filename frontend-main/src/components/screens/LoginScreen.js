import * as API from "../../services/api_backend"
import React, { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import AuthContext from "../../AuthContext";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";

url = "https://api-ovtmrhypiq-ew.a.run.app";

export const LoginScreen = ({ navigation }) => {
  // DATA
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  // NAVIGATION

  const { dispatch } = React.useContext(AuthContext);

  // LOGIN BUTTON

  const checkJWT = async () =>{
    jwt = await API.getValueFor("user");
    authentic = await API.authenticateJWT(jwt);
    if(authentic){
      dispatch({ type: "SIGN_IN" });
    }
  }


  // Check if form is valid and create account
  const handleLoginAccount = async () => {
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // check if form had valid input
    const message = validateForm(username, password);

    if (message) {
      setErrorMessage(message);
    } else {
      handleLogin();
      setSuccessMessage("Verifying login, please wait");
    }
    // clear form
    clearLoginDetails();
  };

  // Clear account details if user has created an account
  const clearLoginDetails = () => {
    setUsername("");
    setPassword("");
  };

  // LOGIN FUNCTION

  const handleLogin = async () => {
    try {
      const response = await fetch(url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login Failed");
      }

      const data = await response.json();
      console.log(data.token);
      await SecureStore.setItemAsync("user", data.token);
      setToken(data.token);
      console.log(data.token);


      // When user is logged in
      dispatch({ type: "SIGN_IN" });
      
    } catch (error) {
      console.log("Login Failed", error.message);
      console.error(error);
    }
  };

  checkJWT();
  // VIEW OF LOGIN UP SCREEN
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>LocalLink</Text>
      </View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text style={styles.title}>Fill in login credentials</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={setUsername}
          value={username}
          placeholder="username"
          placeholderTextColor="#888888"
        />

        <TextInput
          style={styles.inputText}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry={true}
          placeholderTextColor="#888888"
        />

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleLoginAccount}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.successText}>{successMessage}</Text>
        )}

        <TouchableOpacity
          style={styles.btnContainerSmall}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.underlineText}>Sign up here</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

//////////////////////////////////////////////////
//////////////// HELP FUNCTIONS //////////////////
//////////////////////////////////////////////////

// ------------------- Validate data -------------------

const validateForm = (username, password) => {
  if (!username || !password) {
    return "Please fill out all fields";
  }
  if (username.length > 20) {
    return "Username is too long";
  }
  if (password.length < 6 || password.length > 60) {
    return "Password must be between 6 and 60 characters";
  }

  // success
  return "";
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
  buttonGroupStyle: {
    height: 40,
    width: 250,
    borderWidth: 1,
    padding: 1,
    marginBottom: 5,
  },
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#545453",
  },
  appName: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "#e9b4b4",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1,
    fontFamily: "System", // default to system font
    letterSpacing: 2,
  },
});
