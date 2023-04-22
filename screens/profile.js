import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";
import FitcheckVideo from "./components/fitcheckVideo";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
} from "../reducers/user";
import { Video } from "expo-av";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "./profile.style";
import { SafeAreaView } from "react-native";

export default function Profile({ navigation }) {
  //Redux Store data
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    username,
    fullname,
    followers,
    following,
    fitcheckArray,
  } = useSelector((state) => state.user);

  const [retrievedFitchecks, setRetrievedFitchecks] = useState([]);
  const [videoUri, setVideoUri] = useState(null);

  const fetchFitchecks = () => {
    console.log("FITCHECK USERNAME: " + username);
    const formData = {
      username: username,
    };
    fetch(
      "http://192.168.1.30:3000/getallfitcheckdata" ||
        "http://192.168.1.30:3000/getallfitcheckdata",
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
        console.log(data);
        setRetrievedFitchecks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    //navigation.navigate("Profile");
    fetchFitchecks();
  }, [fitcheckArray]);

  const handleLogout = () => {
    dispatch(reset());
    AsyncStorage.clear();
    navigation.navigate("Landing");
  };

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

  const renderFitcheckItem = ({ item }) => {
    console.log(item.video);

    return <FitcheckVideo fitcheck={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: "4%" }}></View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.imageName}>
          <Image
            style={styles.profileImg}
            source={require("../images/homeImg1.png")}
          />
          <Text style={styles.name}>Muhammad Faizan</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.profileStats}>
          <Text style={styles.statsTitle}>Items</Text>
          <Text style={styles.statsNum}>10</Text>
        </View>
        <View style={styles.profileStats}>
          <Text style={styles.statsTitle}>Followers</Text>
          <Text style={styles.statsNum}>20</Text>
        </View>
        <View style={styles.profileStats}>
          <Text style={styles.statsTitle}>Following</Text>
          <Text style={styles.statsNum}>30</Text>
        </View>
        <View style={{ ...styles.profileStats, borderRightColor: "white" }}>
          <Text style={styles.statsTitle}>Sold Items</Text>
          <Text style={styles.statsNum}>40</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.btnText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexWrap: "nowrap" }}>
        <FlatList
          key={3}
          numColumns={3}
          data={retrievedFitchecks}
          renderItem={renderFitcheckItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.navbar}>
        <Navbar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
