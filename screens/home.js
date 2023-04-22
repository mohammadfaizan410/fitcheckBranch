import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";
import styles from "./home.style";
import Swiper from "react-native-swiper";
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
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  //Redux Store data
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    username,
    fullname,
    followers,
    following,
    fitcheckArray,
  } = useSelector((state) => state.user);

  const [allUser, setUsers] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

  const fetchAllUsers = () => {
    const formData = {
      username: username,
    };
    fetch("http://192.168.1.30:3000/" || "http://192.168.1.30:3000/", {
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
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  sampleArr = [1, 2, 3, 4, 5];
  useEffect(() => {
    console.log("use effects");
    fetchAllUsers();
    console.log(allUser);
  }, []);

  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //       navigation.navigate("Login");
  //     }
  //   }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(reset());
    AsyncStorage.clear();
    navigation.navigate("Landing");
  };
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  const togglePlaying = (index) => {
    if (currentVideoIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
      setCurrentVideoIndex(index);
    }
  };

  const onIndexChanged = (index) => {
    if (currentVideoIndex !== null && currentVideoIndex !== index) {
      setIsPlaying(false);
      setCurrentVideoIndex(null);
    }
    setSelectedSlideIndex(index);
    if (currentVideoIndex === null) {
      setCurrentVideoIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.homeContent}>
        {allUser !== null ? (
          <Swiper
            showsPagination={false}
            showsButtons={false}
            horizontal={false}
            loop={false}
            onIndexChanged={onIndexChanged}
            s
          >
            {sampleArr.map((item, index) => (
              <View style={{ ...styles.homeFeed, backgroundColor: "white" }}>
                <TouchableOpacity
                  onPress={() => togglePlaying(index)}
                  activeOpacity={1}
                >
                  <Video
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: `data:video/mp4;base64,${sampleVideo}` }}
                    resizeMode="stretch"
                    shouldPlay={currentVideoIndex === index && isPlaying}
                    isLooping
                    useNativeControls={true}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </Swiper>
        ) : (
          <Text>hello there empty list</Text>
        )}
      </View>
      {/* <Swiper
                horizontal={false}
                showsVerticalScrollIndicator={false}
                  loop={false}
                  showsPagination={false}
              >
                  <View style={{ ...styles.homeFeed, backgroundColor: 'black' }}></View>
                  <View style={{ ...styles.homeFeed, backgroundColor: 'grey' }}></View>
              </Swiper> */}
      <Navbar style={styles.navStyles} navigation={navigation} />
    </SafeAreaView>
  );
}
