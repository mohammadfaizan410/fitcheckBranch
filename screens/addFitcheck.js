import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Permissions } from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";

import { Video } from "expo-av";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
} from "../reducers/user";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import styles from "./addFitcheck.style";
import { SafeAreaView } from "react-native";

export default function AddFitcheck({ navigation, route }) {
  const dispatch = useDispatch();
  console.log(route);
  const {
    isLoggedIn,
    email,
    username,
    fullname,
    followers,
    following,
    fitcheckArray,
  } = useSelector((state) => state.user);
  const [videoCaption, setVideoCaption] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUri = route.params.uri;

  const playIcon = <Icon name="playcircleo" size={70} color="white" />;
  const pauseIcon = <Icon name="pausecircleo" size={70} color="white" />;

  function togglePlaying() {
    setIsPlaying(!isPlaying);
  }

  // pick image

  //upload image
  const uploadVideo = async () => {
    if (!route.params.uri) {
      alert("No video selected!");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("caption", videoCaption);
    formData.append("video", {
      uri: route.params.uri,
      type: "video/mp4", // replace with the actual file type
      name: "video.mp4", // replace with the actual file name
    });

    fetch("http://192.168.1.30:3000/uploadfitcheck2", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        const newfitcheckArray = [...fitcheckArray, result];
        dispatch(setFitcheckArray(newfitcheckArray));
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
        navigation.navigate("Home");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={togglePlaying}
        style={{ ...styles.preview, borderColor: "black", borderWidth: 2 }}
      >
        <Video
          source={{ uri: route.params.uri }}
          style={styles.previewVideo}
          shouldPlay={isPlaying}
          isLooping
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.captionContainer}>
        <Text
          style={{
            ...styles.buttonText,
            color: "black",
            textAlign: "left",
            paddingBottom: 10,
          }}
        >
          Write Video Caption:{" "}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Caption"
          placeholderTextColor="#999"
          onChangeText={setVideoCaption}
          value={videoCaption}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={uploadVideo}>
            <Text style={styles.buttonText}>Upload Video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Video")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
