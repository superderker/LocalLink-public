import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigation";
import { LoginNavigator } from "./navigation/LoginNavigation";
import AuthContext from "./AuthContext";
import 'react-native-reanimated'

const initialState = { isSignedIn: true };

function reducer(state, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { isSignedIn: true };
    case "SIGN_OUT":
      return { isSignedIn: false };
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        {state.isSignedIn ? <MainNavigator /> : <LoginNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
