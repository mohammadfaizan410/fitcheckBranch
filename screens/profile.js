import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import styles from "./profile.style";

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
    images,
    videos,
  } = useSelector((state) => state.user);

  const [retrievedImages, setRetrievedImages] = useState([]);

  useEffect(() => {
    const formData = {
      username: username,
    };

    fetch("http://192.168.1.30:3000/getimages", {
      //replace with server IP later
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRetrievedImages(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    navigation.navigate("Profile");
  }, [images]);

  const handleLogout = () => {
    dispatch(reset());
    AsyncStorage.clear();
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

  const renderImageItem = ({ item }) => (
    <View>
      <Image
        style={{ ...styles.postImage, width: "30%", height: 200 }}
        source={{ uri: `data:${item.contentType};base64,${item.data}` }}
      />
      <Text>{item.caption}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          source={require("../assets/favicon.png")}
          style={[styles.profilePicture, { alignSelf: "flex-start" }]}
        />
        <View style={styles.columnContainer}>
          <Text style={{ ...styles.title }}>{username}</Text>
          <Text style={{ ...styles.subtitle }}>{fullname}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { alignSelf: "flex-end" }]}
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText]}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UploadImage")}
        >
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.postContainer}
        data={retrievedImages}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.filename}
      />
    </View>
  );
}
