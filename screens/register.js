import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./register.style";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/AntDesign';

export default function Register({ navigation }) {
  const userIcon = <Icon name="user" size={30} />;
  const LockIcon = <Icon name="lock" size={30} />;
  const [isRegistered, setIsRegistered] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [keyboardState, setKeyboardState] = useState(false)
  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardState(true);
  })
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardState(false);
  })

  const handleSubmit = () => {
    const formData = {
      fullname: fullname,
      email: email,
      username: username,
      password: password,
      id: username,
    };

    //handle registration logic here

    fetch("http://192.168.1.20:3000/register" || "http://192.168.1.30:3000/register", {
      //replace with server IP later
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.backgroundImage} source={require("../images/loginImg.jpg")}></Image>

        {keyboardState === false ? <Text style={styles.screenTitle}>Welcome back to</Text> : ''}
        {keyboardState===false ? 
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../images/logoAndText.png")}></Image>  
        </View> : ''}

        <View style={{...styles.formContainer}}>
        <View style={{ ...styles.formSection, borderBtoomWidth: 0, borderBottomColor: 'white' }}>
          <Text style={{ ...styles.formTitle }}>Create Account</Text>
          </View>
          <View style={styles.formSection}>
          {userIcon}
          <TextInput
          style={styles.registerInput}
          placeholder="Email/Phone Number"
          placeholderTextColor="#999"
          onChangeText={setEmail}
          value={email}
          />
        </View>
          <View style={styles.formSection}>
          {LockIcon}
          <TextInput
          style={styles.registerInput}
          placeholder="Password"
          placeholderTextColor="#999"
          onChangeText={setPassword}
          value={password}
          />
          </View>
          
        {/* <Text style={styles.subtitle}>Full Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
          onChangeText={setFullName}
          value={fullname}
          />

        <Text style={styles.subtitle}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          />

        <Text style={styles.subtitle}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          placeholderTextColor="#999"
          onChangeText={setUsername}
          value={username}
          />

        <Text style={styles.subtitle}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="#999"
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
          /> */}
          <TouchableOpacity style={{ ...styles.button, marginTop: 30 }} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        </View>
  </SafeAreaView>
  );
}
