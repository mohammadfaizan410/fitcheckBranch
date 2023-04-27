import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import RefreshStore from "./refreshStoreData";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
  setListingArray,
  setPageRefresher,
} from "../../reducers/user";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";

import styles from "./avatar.style";

export default function Avatar({
  navigation,
  incomingStyle,
  incomingUsername,
}) {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    currentusername,
    fullname,
    followers,
    following,
    fitcheckArray,
    listingArray,
    pageRefresher,
  } = useSelector((state) => state.user);
  dispatch(setPageRefresher(!pageRefresher));

  RefreshStore();

  const [recievedImage, setRecievedImage] = useState(null);

  useEffect(() => {
    fetchAvatar();
  }, [incomingUsername]);

  //upload image
  const fetchAvatar = async () => {
    const formData = {
      username: incomingUsername,
    };

    await fetch(
      "http://192.168.1.30:3000/getAvatar" ||
        "http://192.168.1.30:3000/getAvatar",
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
        setRecievedImage(data.image);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ ...incomingStyle }}>
      <Image
        source={{ uri: "data:image/jpg;base64," + recievedImage }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 100,
          alignSelf: "center",
          resizeMode: "contain",
        }}
      />
    </View>
  );
}
