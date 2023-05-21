import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
  setPageRefresher,
} from "../../reducers/user";
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
import styles from "./followbutton.style";
import { SafeAreaView } from "react-native";

export default function FollowButton({ navigation, followingToUsername }) {
  //Redux Store data
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    currentusername,
    fullname,
    followers,
    following,
    fitcheckArray,
    pageRefresher,
  } = useSelector((state) => state.user);

  const [retrievedFitchecks, setRetrievedFitchecks] = useState([]);
  const [videoUri, setVideoUri] = useState(null);

  const handleFollowPress = () => {
    const formData = {
      username: currentusername,
      following: followingToUsername,
    };
    fetch(
      "http://192.168.1.24:3000/modifyfollowing" ||
        "http://192.168.1.24:3000/modifyfollowing",
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={styles.followBtn}
        onPress={() => handleFollowPress()}
      >
        <Text style={styles.btnText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
}
