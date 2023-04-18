import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import {
  setIsLoggedIn,
  setUserEmail,
  setUsername,
  setFullname,
  setFollowers,
  setFollowing,
  setFitcheckArray,
} from "../reducers/user";
import {
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "./login.styles";
import { Button } from "react-native-web";

export default function Login({ navigation }) {
  const userIcon = <Icon name="user" size={30} />;
  const LockIcon = <Icon name="lock" size={30} />;
  //Redux Store data
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

  //const [email, setEmail] = useState('');
  const [usernameAtLogin, setUsernameAtLogin] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardState, setKeyboardState] = useState(false);

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
      console.log("logged in");
      navigation.navigate("Profile");
    }
  }, [isLoggedIn]);

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardState(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardState(false);
  });

  const handleLogin = () => {
    console.log("login activated");
    const formData = {
      username: usernameAtLogin,
      password: password,
    };

    fetch(
      "http://192.168.1.20:3000/login" || "http://192.168.1.30:3000/login",
      {
        //replace with server IP later
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
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
          console.log("Invalid Email or Password");
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
    dispatch(setFitcheckArray(userData["fitcheck"]));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backGroundImage}
        source={require("../images/loginImg.jpg")}
      ></Image>
      {keyboardState === false ? (
        <Text style={styles.screenTitle}>Welcome back to</Text>
      ) : (
        ""
      )}
      {keyboardState === false ? (
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../images/logoAndText.png")}
          ></Image>
        </View>
      ) : (
        ""
      )}

      <View style={styles.formContainer}>
        <View
          style={{
            ...styles.formSection,
            borderBtoomWidth: 0,
            borderBottomColor: "white",
          }}
        >
          <Text style={{ ...styles.formTitle }}>Login</Text>
        </View>
        <View style={styles.formSection}>
          {userIcon}
          <TextInput
            style={styles.loginInput}
            placeholder="Username"
            placeholderTextColor="#999"
            onChangeText={setUsernameAtLogin}
            value={usernameAtLogin}
          />
        </View>
        <View style={styles.formSection}>
          {LockIcon}
          <TextInput
            style={styles.loginInput}
            placeholder="Enter your Password"
            placeholderTextColor="#999"
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={{ ...styles.button, marginTop: 30 }}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
{
  /* <View style={styles.container}>
<View style={styles.subcontainer}>

<Text style={styles.title}>Welcome Back to FitCheck</Text>

<Text style={styles.subtitle}>Username:</Text>


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
 </View> */
}

// <TextInput
//     style={styles.input}
//     placeholder="Enter your Username"
//     placeholderTextColor="#999"
//     onChangeText={setUsernameAtLogin}
//     value={usernameAtLogin}
//     />

//     <Text style={styles.subtitle}>Password:</Text>
//     <TextInput
//     style={styles.input}
//     placeholder="Enter your Password"
//     placeholderTextColor="#999"
//     onChangeText={setPassword}
//     secureTextEntry={true}
//     value={password}
//     />
