import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";
import FitcheckVideo from "./components/fitcheckVideo";
import FollowButton from "./components/followbutton";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
  setPageRefresher,
} from "../reducers/user";
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
import styles from "./profile.style";
import { SafeAreaView } from "react-native";

export default function Profile({ navigation, route }) {
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
    pageRefresher,
  } = useSelector((state) => state.user);
  console.log(route && route.params && route.params.otherUser !== undefined);

  useEffect(() => {}, [pageRefresher]);

  if (!(route && route.params && route.params.otherUser !== undefined)) {
    console.log("OTHER USERNAME NOT SET");

    const [retrievedFitchecks, setRetrievedFitchecks] = useState([]);
    const [videoUri, setVideoUri] = useState(null);

    useEffect(() => {
      if (!isLoggedIn) {
        navigation.navigate("Login");
      }
    }, [isLoggedIn]);

    useEffect(() => {
      fetchFitchecks();
    }, [fitcheckArray]);

    const fetchFitchecks = () => {
      const formData = {
        username: currentusername,
      };
      fetch(
        "http://192.168.1.30:3000/getallfitcheckdata" ||
          "http://192.168.1.30:3000/getallfitcheckdata",
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
          setRetrievedFitchecks(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleLogout = () => {
      dispatch(reset());
      AsyncStorage.clear();
      navigation.navigate("Landing");
    };

    const handleFollowingScreenPress = () => {
      navigation.navigate("Following");
    };

    AsyncStorage.getItem("user")
      .then((storedData) => {
        const userData = JSON.parse(storedData);
      })
      .catch((error) => {
        console.log("Error retrieving data from AsyncStorage: ", error);
      });

    const renderFitcheckItem = ({ item }) => {
      return <FitcheckVideo fitcheck={item} navigation={navigation} />;
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ height: "4%" }}></View>
        <View style={styles.infoContainer}>
          <View style={styles.imageName}>
            <Image
              style={styles.profileImg}
              source={require("../images/homeImg1.png")}
            />
            <Text style={styles.name}>{fullname}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.profileStats}>
            <Text style={styles.statsTitle}>Items</Text>
            <Text style={styles.statsNum}>10</Text>
          </View>
          <View style={styles.profileStats}>
            <Text style={styles.statsTitle}>Followers</Text>
            <Text style={styles.statsNum}>20</Text>
          </View>
          <View style={styles.profileStats}>
            <TouchableOpacity onPress={handleFollowingScreenPress}>
              <Text style={styles.statsTitle}>Following</Text>
              <Text style={styles.statsNum}>30</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.profileStats, borderRightColor: "white" }}>
            <Text style={styles.statsTitle}>Sold Items</Text>
            <Text style={styles.statsNum}>40</Text>
          </View>
        </View>
        <FollowButton username={currentusername} />
        <View style={{ flex: 1, flexWrap: "nowrap" }}>
          <FlatList
            key={2}
            numColumns={2}
            data={retrievedFitchecks}
            renderItem={renderFitcheckItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.navbar}>
          <Navbar navigation={navigation} />
        </View>
      </SafeAreaView>
    );
  } else {
    console.log("OTHER USERNAME SET");

    const otherUser = route.params.otherUser;
    console.log(otherUser);

    const [otherretrievedFitchecks, setOtherRetrievedFitchecks] = useState([]);
    const [othervideoUri, setOtherVideoUri] = useState(null);

    useEffect(() => {
      if (!isLoggedIn) {
        navigation.navigate("Login");
      }
    }, [isLoggedIn]);

    useEffect(() => {
      fetchFitchecks();
    }, [fitcheckArray]);

    const fetchFitchecks = () => {
      const formData = {
        username: otherUser.username,
      };
      fetch(
        "http://192.168.1.30:3000/getallfitcheckdata" ||
          "http://192.168.1.30:3000/getallfitcheckdata",
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
          setOtherRetrievedFitchecks(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleLogout = () => {
      dispatch(reset());
      AsyncStorage.clear();
      navigation.navigate("Landing");
    };

    const handleFollowingScreenPress = () => {
      navigation.navigate("Following");
    };

    AsyncStorage.getItem("user")
      .then((storedData) => {
        const userData = JSON.parse(storedData);
      })
      .catch((error) => {
        console.log("Error retrieving data from AsyncStorage: ", error);
      });

    const renderFitcheckItem = ({ item }) => {
      return <FitcheckVideo fitcheck={item} navigation={navigation} />;
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ height: "4%" }}></View>
        <View style={styles.infoContainer}>
          <View style={styles.imageName}>
            <Image
              style={styles.profileImg}
              source={require("../images/homeImg1.png")}
            />
            <Text style={styles.name}>{otherUser.username}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.profileStats}>
            <Text style={styles.statsTitle}>Items</Text>
            <Text style={styles.statsNum}>10</Text>
          </View>
          <View style={styles.profileStats}>
            <Text style={styles.statsTitle}>Followers</Text>
            <Text style={styles.statsNum}>20</Text>
          </View>
          <View style={styles.profileStats}>
            <TouchableOpacity onPress={handleFollowingScreenPress}>
              <Text style={styles.statsTitle}>Following</Text>
              <Text style={styles.statsNum}>30</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.profileStats, borderRightColor: "white" }}>
            <Text style={styles.statsTitle}>Sold Items</Text>
            <Text style={styles.statsNum}>40</Text>
          </View>
        </View>
        <FollowButton username={currentusername} />
        <View style={{ flex: 1, flexWrap: "nowrap" }}>
          <FlatList
            key={2}
            numColumns={2}
            data={otherretrievedFitchecks}
            renderItem={renderFitcheckItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.navbar}>
          <Navbar navigation={navigation} />
        </View>
      </SafeAreaView>
    );
  }
}
