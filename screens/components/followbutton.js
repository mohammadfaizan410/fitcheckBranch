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

export default function FollowButton({
  navigation,
  username,
  followingTousername,
}) {
  //Redux Store data

  const [retrievedFitchecks, setRetrievedFitchecks] = useState([]);
  const [videoUri, setVideoUri] = useState(null);

  const handleFollowPress = (username) => {};

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
