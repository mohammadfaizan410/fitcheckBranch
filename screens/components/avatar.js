import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import RefreshStore from "./refreshStoreData";
import { useFocusEffect } from "@react-navigation/native";

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
      "http://192.168.1.24:3000/getAvatar" ||
        "http://192.168.1.24:3000/getAvatar",
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

  useFocusEffect(
    React.useCallback(() => {
      // Code to refresh the screen
      // For example, you can call an API or update state here
      // This code will be executed each time the screen gains focus
      console.log("Avatar ON FOCUS");
      fetchAvatar();
    }, [])
  );

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
