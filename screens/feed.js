import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";
import styles from './feed.style'
import Swiper from "react-native-swiper";
import { Video } from "expo-av";
import HomeFitcheckVideo from "./components/homeFitcheckVideo";
import SearchBox from "./components/searchbox";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
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

export default function Feed({ navigation }) {
  //Redux Store data
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    currentusername,
    fullname,
    followers,
    following,
    fitcheckArray,
  } = useSelector((state) => state.user);

  const [allFitchecks, setAllFitchecks] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

  const fetchAllUsers = () => {
    const formData = {
      username: currentusername,
    };
    fetch(
      "http://192.168.1.22:3000/getallusersandfitchecks" ||
        "http://192.168.1.22:3000/getallusersandfitchecks",
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
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

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
      <SearchBox navigation={navigation} />
      <View style={styles.homeContent}>
        {allFitchecks !== null ? (
          <Swiper
            showsPagination={false}
            showsButtons={false}
            horizontal={false}
            loop={false}
            onIndexChanged={onIndexChanged}
            loadMinimal={true}
            loadMinimalSize={0}
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
                </TouchableOpacity>
              </View>
            ))}
          </Swiper>
        ) : (
          <Text>No Fitchecks to show!</Text>
        )}
      </View>

      <Navbar style={styles.navStyles} navigation={navigation} />
    </SafeAreaView>
  );
}
