import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./navbar";
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
import styles from "./fitcheckVideo.style";
import { SafeAreaView } from "react-native";

export default function FitcheckVideo({ navigation, fitcheck }) {
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

  const [retrievedFitchecks, setRetrievedFitchecks] = useState([]);
  const [imageUri, setImageUri] = useState(null);

  const fetchVideo = () => {
    const formData = {
      username: currentusername,
      filename: fitcheck.video.postername,
    };
    const response = fetch(
      "http://192.168.1.30:3000/getfile" || "http://192.168.1.30:3000/getfile",
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
          setImageUri(base64data);
        };
      });
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const handleFitcheckPress = (fitcheckObject) => {
    const formData = {
      username: currentusername,
      fitcheckId: fitcheckObject.id,
    };

    fetch(
      "http://192.168.1.30:3000/getfitcheckdata" ||
        "http://192.168.1.30:3000/getfitcheckdata",
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
        navigation.navigate("Fitcheck", { fitcheck: fitcheck });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handleFitcheckPress(fitcheck)}>
        {imageUri ? (
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: imageUri,
            }}
          />
        ) : (
          <Text>Loading</Text>
        )}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
          {fitcheck.caption}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
