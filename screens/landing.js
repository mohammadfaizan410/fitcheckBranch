import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import LandingPageComponent from "./components/landingPageComponent";
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
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native";
import styles from "./landing.style";
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
  const [index, setIndex] = useState(1);

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

    fetch("http://192.168.1.20:3000/login", {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
          {index === 0 ?  
      <View style={styles.loginTop}> 
          <Image style={styles.welcomeImage} source={require("../images/welcome.png")} />
          <View style={styles.overlay}></View>
          <View style={styles.titleView}><Text style={styles.title}>Welcome to</Text></View>
          
          <View style={{ ...styles.titleView, top: '-10%', flexDirection:'row'}}>
            <Image style={styles.logo} source={require("../images/logo.png")}></Image>
            <Text style={{ ...styles.title, color:"#3E0099", marginLeft:20, fontSize:50, fontFamily: 'Neurial Grotesk', fontStyle:'normal' }}>FitCheck</Text>
          </View>
         
          <View style={{ ...styles.titleView, top: '50%' }}>
            <Text style={{ ...styles.title, fontFamily: 'Open Sans', fontWeight: 400, fontSize:30 }}>Resale, renewed</Text>
          </View>
          <View style={{ ...styles.titleView, top: '67%' }}>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center' }}>
            <Text style={{ ...styles.title, fontFamily: 'Open Sans', fontWeight: 400, fontSize: 15 }}>Swipe to learn More</Text>
            <Image style={{ width: 20, height: 10, marginLeft: 10 }} source={require("../images/arrow.png")}></Image>
            </View>
            {/* if selected use filled */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }} >
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../images/EllipseEmpty.png")}></Image>
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../images/EllipseEmpty.png")}></Image>
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../images/EllipseEmpty.png")}></Image>
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../images/EllipseEmpty.png")}></Image>
            </View>

          </View>
          </View> : <LandingPageComponent
                      index = {index}
                    />
        }
        
        <View style={styles.loginBottom}> 
          <View style={styles.btnContainer}>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                          <Text style={{ ...styles.buttonText, paddingRight:10 }}> Login</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
                          <Text style={styles.buttonText}>Register</Text>
                      </TouchableOpacity>
          </View>    
        </View>
    </View>
</SafeAreaView>
  );
}
