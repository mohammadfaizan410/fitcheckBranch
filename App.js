import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Login from "./screens/login";
import Register from "./screens/register";
import Profile from "./screens/profile";
import Landing from "./screens/landing";
import UploadImage from "./screens/uploadImage";
import AddFitcheck from "./screens/addFitcheck";
import Fitcheck from "./screens/fitcheck";
import AddListing from "./screens/addListing";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  function ProfileScreen(props) {
    return <Profile {...props} />;
  }
  function LoginScreen(props) {
    return <Login {...props} />;
  }
  function RegisterScreen(props) {
    return <Register {...props} />;
  }
  function UploadImageScreen(props) {
    return <UploadImage {...props} />;
  }
  function UploadFitcheckScreen(props) {
    return <AddFitcheck {...props} />;
  }
  function FitcheckScreen(props) {
    return <Fitcheck {...props} />;
  }
  function AddListingScreen(props) {
    return <AddListing {...props} />;
  }
  function LandingImageScreen(props) {
    return <Landing {...props} />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingImageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadImage"
            component={UploadImageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadFitcheck"
            component={UploadFitcheckScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Fitcheck"
            component={FitcheckScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddListing"
            component={AddListingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
