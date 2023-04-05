import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoggedIn,
  setUserEmail,
  setUsername,
  setFullname,
  setFollowers,
  setFollowing,
  setImages,
  setVideos,
} from "../reducers/user";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./login.style";

export default function Login({ navigation }) {
  //Redux Store data
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    fullname,
    username,
    followers,
    following,
    images,
    videos,
  } = useSelector((state) => state.user);

  //const [email, setEmail] = useState('');
  const [usernameAtLogin, setUsernameAtLogin] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});

  AsyncStorage.getItem("user")
    .then((storedData) => {
      const userData = JSON.parse(storedData);
      if (userData != null) {
        setIsLoggedIn(true);
      }
    })
    .catch((error) => {
      console.log("Error retrieving data from AsyncStorage: ", error);
    });

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Profile");
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    const formData = {
      email: "",
      username: usernameAtLogin,
      password: password,
      id: usernameAtLogin,
    };

    fetch("http://192.168.1.30:3000/login", {
      //replace with server IP later
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message[0] != undefined) {
          // do stuff if login creds. correct
          console.log(data.message[0]);
          let userData = data.message[0];
          AsyncStorage.setItem("user", JSON.stringify(userData));
          setUserData(userData);
          setIsLoggedIn(true);
        } else {
          //login cred. WRONG
          console.log("Invalid Username or Password");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setUserData = (userData) => {
    dispatch(setIsLoggedIn(true));
    dispatch(setUsername(userData["username"]));
    dispatch(setFullname(userData["fullname"]));
    dispatch(setUserEmail(userData["email"]));
    dispatch(setFollowers(userData["followers"]));
    dispatch(setFollowing(userData["following"]));
    dispatch(setFollowing(userData["following"]));
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Fitcheck</Text>

        <Text style={styles.subtitle}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          placeholderTextColor="#999"
          onChangeText={setUsernameAtLogin}
          value={usernameAtLogin}
        />

        <Text style={styles.subtitle}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="#999"
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
