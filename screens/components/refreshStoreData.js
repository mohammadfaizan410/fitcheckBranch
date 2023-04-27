import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
  setPageRefresher,
} from "../../reducers/user";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";

export default function RefreshStore() {
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

  useEffect(() => {
    getUpdatedUser();
  }, []);

  const getUpdatedUser = async () => {
    const formData = {
      username: currentusername,
    };
    await fetch(
      "http://192.168.1.30:3000/getUser" || "http://192.168.1.30:3000/getUser",
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
        setUserData(data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setUserData = (user) => {
    dispatch(setUserEmail(user.email));
    dispatch(setFollowers(user.followers));
    dispatch(setFollowing(user.following));
    dispatch(setFitcheckArray(user.fitchecks));
  };
}
