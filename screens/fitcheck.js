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
  setFitcheckArray,
} from "../reducers/user";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import styles from "./fitcheck.style";

export default function Fitcheck({ navigation, route }) {
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
  const { fitcheck } = route.params;
  const [likes, setLikes] = useState(fitcheck.likes);

  useEffect(() => {}, [likes]);

  const handleLike = () => {
    const formData = {
      username: username,
      fitcheckId: fitcheck.id,
    };
    fetch(
      "http://192.168.1.30:3000/addLikes" ||
        "http://192.168.1.20:3000/addLikes",
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
        setLikes(data.likes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddListing = (fitcheckId) => {
    navigation.navigate("AddListing", { fitcheck: fitcheck });
  };

  return (
    <SafeAreaView style={styles.fitcheckContainer}>
      <View style={{ ...styles.imageContainer }}>
        <Image
          style={{ ...styles.image }}
          source={{
            uri: `data:${fitcheck.contentType};base64,${fitcheck.data}`,
          }}
        />
      </View>
      <View style={styles.captionContainer}>
        <Text>{fitcheck.caption}</Text>
        <Text>Likes {likes}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { alignSelf: "center" }]}
        onPress={handleLike}
      >
        <Text style={[styles.buttonText]}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { alignSelf: "center" }]}
        onPress={() => handleAddListing(fitcheck.id)}
      >
        <Text style={[styles.buttonText]}>Add Listing</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
