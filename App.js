import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View }from 'react-native';
import React, { useState } from 'react';
import Login from './screens/login';
import NavBar from './components/navBar';



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
      {isLoggedIn && <NavBar changeLoginState={setIsLoggedIn} />}
      <Login changeLoginState={setIsLoggedIn} />
    </>
  );
}

