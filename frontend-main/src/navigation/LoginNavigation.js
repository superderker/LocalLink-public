import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupScreen } from "../components/screens/SignupScreen";
import { LoginScreen } from "../components/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" options={{}} component={LoginScreen} />
      <Stack.Screen
        name="Signup"
        options={{
          gestureEnabled: true,
          animation: "slide_from_bottom",
          presentation: "modal",
        }}
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
};
