import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./navbar";
import NavVideo from "./navVideo";

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
import styles from "./homeFitcheckVideo.style";
import { SafeAreaView } from "react-native";

export default function HomeFitcheckVideo({
  navigation,
  fitcheck,
  shouldPlay,
}) {
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
  } = useSelector((state) => state.user);
  console.log("FITCHECK VIDEO IS");
  console.log(fitcheck.video);

  const [videoUri, setVideoUri] = useState(null);

  const fetchVideo = () => {
    const formData = {
      filename: fitcheck.video,
    };
    const response = fetch(
      "http://192.168.1.22:3000/getfile" || "http://192.168.1.22:3000/getfile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        const blob = response.blob();
        return blob;
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          setVideoUri(base64data);
        };
      });
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <View>
      {videoUri ? (
        <>
        <Video
          source={{ uri: videoUri }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="stretch"
          shouldPlay={shouldPlay}
          isLooping
          useNativeControls={true}
          />
        <NavVideo
        navigation={navigation}
        fitcheck={fitcheck}
        />
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
}
