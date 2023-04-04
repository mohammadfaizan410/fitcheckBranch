import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text} from 'react-native';
import Login from './screens/login';
import Register from './screens/register';
import NavBar from './components/navBar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={(props) => <Login {...props} />} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={(props) => <Register {...props} options={{ headerShown: false }} />} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

