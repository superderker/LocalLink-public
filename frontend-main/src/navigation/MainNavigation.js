import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../components/screens/HomeScreen";
import { ChatScreen } from "../components/screens/ChatScreen";
import { SearchScreen } from "../components/screens/SearchScreen";
import { MapScreen } from "../components/screens/MapScreen";
import { EventsScreen } from "../components/screens/EventsScreen";
import { MatchingScreen } from "../components/screens/MatchingScreen";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventScreen } from "../components/screens/EventScreen";
import { ProfileScreen } from "../components/screens/ProfileScreen";
import { CreateEventScreen } from "../components/screens/CreateEventScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          gestureEnabled: true,
          animation: "slide_from_bottom",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: "#1DB954",
      }}
    >
{/*       <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Matching"
        component={MatchingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
{/*       <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
