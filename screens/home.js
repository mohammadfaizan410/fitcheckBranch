import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";
import styles from "./home.style";
import Swiper from "react-native-swiper";
import { Video } from "expo-av";
import HomeFitcheckVideo from "./components/homeFitcheckVideo";

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

  const [allFitchecks, setAllFitchecks] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

  const fetchAllUsers = () => {
    const formData = {
      username: username,
    };
    fetch(
      "http://192.168.1.30:3000/getallusersandfitchecks" ||
        "http://192.168.1.30:3000/getallusersandfitchecks",
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
        setAllFitchecks(data);
      })
      .catch((error) => {
        console.error(allFitchecks);
      });
  };

  useEffect(() => {
    fetchAllUsers();
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
        {allFitchecks !== null ? (
          <Swiper
            showsPagination={false}
            showsButtons={false}
            horizontal={false}
            loop={false}
            onIndexChanged={onIndexChanged}
            s
          >
            {allFitchecks.map((item, index) => (
              <View
                key={item.id}
                style={{ ...styles.homeFeed, backgroundColor: "white" }}
              >
                <TouchableOpacity
                  onPress={() => togglePlaying(item, index)}
                  activeOpacity={1}
                >
                  <HomeFitcheckVideo
                    shouldPlay={currentVideoIndex === index && isPlaying}
                    fitcheck={item}
                    navigation={navigation}
                  />
                  {/*<Video
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: `data:video/mp4;base64,${sampleVideo}` }}
                    resizeMode="stretch"
                    shouldPlay={currentVideoIndex === index && isPlaying}
                    
                    
            />*/}
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
