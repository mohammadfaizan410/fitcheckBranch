import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";
import FitcheckVideo from "./components/fitcheckVideo";
import FollowButton from "./components/followbutton";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
  setPageRefresher,
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
import styles from "./following.style";
import { SafeAreaView } from "react-native";

export default function Following({ navigation, route }) {
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

  const [retrievedfollowing, setretrievedfollowing] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [pressedUserObject, setPressedUserObject] = useState(null);

  const fetchUser = () => {
    const formData = {
      username: currentusername,
    };
    fetch(
      "http://192.168.1.30:3000/getuser" || "http://192.168.1.30:3000/getuser",
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
        setretrievedfollowing(data.user.following);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUserPress = (item) => {
    const formData = {
      username: item,
    };
    fetch(
      "http://192.168.1.30:3000/getuser" || "http://192.168.1.30:3000/getuser",
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
        dispatch(setPageRefresher(!pageRefresher));
        navigation.navigate("Profile", { otherUser: data.user });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderFollowingList = ({ item }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity onPress={() => handleUserPress(item)}>
          <Text style={styles.statsTitle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: "10%" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={retrievedfollowing}
          renderItem={renderFollowingList}
          keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
}
