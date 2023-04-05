import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Login from "./screens/login";
import Register from "./screens/register";
import Profile from "./screens/profile";
import UploadImage from "./screens/uploadImage";
import NavBar from "./components/navBar";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Profile"
            component={(props) => <Profile {...props} />}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={(props) => <Login {...props} />}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={(props) => <Register {...props} />}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadImage"
            component={(props) => <UploadImage {...props} />}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
