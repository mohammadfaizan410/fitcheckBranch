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
  setImages,
  setVideos,
} from "../reducers/user";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import styles from "./uploadImage.style";

export default function UploadImage({ navigation }) {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    username,
    fullname,
    followers,
    following,
    images,
    videos,
  } = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageCaption, setImageCaption] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

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
      setSelectedImage(result.assets[0].uri);
    }
  };

  //upload image
  const uploadImage = async () => {
    if (!selectedImage) {
      alert("No image selected!");
      return;
    }

    const base64Image = await FileSystem.readAsStringAsync(selectedImage, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = {
      username: username,
      caption: imageCaption,
      image: base64Image,
    };
    console.log("Form Data: " + formData.username);

    fetch("http://192.168.1.30:3000/imageupload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log("Success: ", result);
        dispatch(setImages(result.filename));
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
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={[styles.selectedImage]}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an image from camera roll</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload image</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Write Image Caption: </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Caption"
          placeholderTextColor="#999"
          onChangeText={setImageCaption}
          value={imageCaption}
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
