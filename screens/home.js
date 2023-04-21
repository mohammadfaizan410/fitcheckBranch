import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";
import styles from "./home.style";
import Swiper from "react-native-swiper";

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
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("use effects");
    fetchAllUsers();
    console.log(allUser);
  }, []);

  const arr = [1, 2, 3, 4, 5];

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

  const MySwiper = () =>
    allUser !== null ? (
      <Swiper
        showsPagination={false}
        showsButtons={false}
        horizontal={false}
        loop={false}
      >
        {allUser.map((item) => (
          <View style={{ ...styles.homeFeed, backgroundColor: "grey" }}>
            <Image
              style={{ ...styles.image }}
              source={{
                uri: `data:${item.video.contentType};base64,${item.video.data}`,
              }}
            />
          </View>
        ))}
      </Swiper>
    ) : (
      <Text>'hello there empty list'</Text>
    );

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.homeContent}>
        {allUser !== null ? (
          <Swiper
            showsPagination={false}
            showsButtons={false}
            horizontal={false}
            loop={false}
          >
            {allUser.map((item) => (
              <View style={{ ...styles.homeFeed, backgroundColor: "grey" }}>
                {/* {console.log(item.video) } */}
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{
                    uri: `data:${item.video.contentType};base64,${item.video}`,
                  }}
                />
                <Text>Hello there</Text>
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
