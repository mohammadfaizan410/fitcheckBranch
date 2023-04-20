import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";
import styles from "./home.style"
import Swiper from 'react-native-swiper';

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
} from "../reducers/user";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  //Redux Store data
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    username,
    fullname,
    followers,
    following,
    fitcheckArray,
  } = useSelector((state) => state.user);

  const [allUser, setUsers] = useState([]);

  const fetchAllUsers = () => {
    const formData = {
      username: username,
    };
    fetch(
      "http://192.168.1.20:3000/getalluser" ||
        "http://192.168.1.30:3000/getallusers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const arr = [1, 2, 3, 4, 5];

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigation.navigate("Login");
//     }
//   }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(reset());
    AsyncStorage.clear();
    navigation.navigate("Landing");
  };


  const MySwiper = () => (
    <Swiper showsPagination={false} showsButtons={false} horizontal={false} loop={false}>
      {arr.map((item) => (
        <View style={{ ...styles.homeFeed, backgroundColor: 'grey' }}><Text>Hello there { item}</Text></View>
          ))}
    </Swiper>
  );

  console.log('hello there')

  AsyncStorage.getItem("user")
    .then((storedData) => {
      const userData = JSON.parse(storedData);
      if (userData != null) {
        console.log("Stored data is: ", userData);
      } else {
        console.log("NO STORED DATA");
      }
    })
    .catch((error) => {
      console.log("Error retrieving data from AsyncStorage: ", error);
    });
  
  


  return (
      <SafeAreaView style={styles.homeContainer}>
          <View style={styles.homeContent}>{MySwiper()}</View>
              {/* <Swiper
                horizontal={false}
                showsVerticalScrollIndicator={false}
                  loop={false}
                  showsPagination={false}
              >
                  <View style={{ ...styles.homeFeed, backgroundColor: 'black' }}></View>
                  <View style={{ ...styles.homeFeed, backgroundColor: 'grey' }}></View>
              </Swiper> */}
          <Navbar
              style={styles.navStyles}
            navigation = {navigation}
          />
    </SafeAreaView>
  );
}
