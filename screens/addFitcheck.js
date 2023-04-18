import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Permissions } from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function AddFitcheck({ navigation }) {
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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCaption, setVideoCaption] = useState("");

  // pick image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0].uri);
    }
  };

  //upload image
  const uploadImage = async () => {
    if (!selectedVideo) {
      alert("No image selected!");
      return;
    }

    const base64Image = await FileSystem.readAsStringAsync(selectedVideo, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = {
      username: username,
      caption: videoCaption,
      video: base64Image,
    };

    fetch(
      "http://192.168.1.20:3000/uploadfitcheck" ||
        "http://192.168.1.30:3000/uploadfitcheck",
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
      .then((result) => {
        console.log("Success: ", result);
        const newfitcheckArray = [...fitcheckArray, result];
        dispatch(setFitcheckArray(newfitcheckArray));
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.error(error);
        navigation.navigate("Profile");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        {selectedVideo && (
          <Image
            source={{ uri: selectedVideo }}
            style={[styles.selectedVideo]}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick a video from camera roll</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload Video</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Write Video Caption: </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Caption"
          placeholderTextColor="#999"
          onChangeText={setVideoCaption}
          value={videoCaption}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
