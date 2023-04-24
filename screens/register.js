import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./register.style";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

export default function Register({ navigation }) {
  const userIcon = <Icon name="user" size={30} />;
  const LockIcon = <Icon name="lock" size={30} />;
  const [isRegistered, setIsRegistered] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [username, setCurrentUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [inputError, setInputError] = useState("");
  const [keyboardState, setKeyboardState] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(0);

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardState(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardState(false);
  });

  const handleSubmit = () => {
    setInputError("");
    const formData = {
      fullname: fullname,
      username: username,
      phonenumber: phonenumber,
      email: email,
      password: password,
    };
    console.log(formData);
    //handle registration logic here
    if (formData.email !== "" && formData.password !== "") {
      fetch(
        "http://192.168.1.30:3000/register" ||
          "http://192.168.1.30:3000/register",
        {
          //replace with server IP later
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigation.navigate("Login");
        })
        .catch((err) => console.error(err));
    } else {
      setInputError("please fill all details!");
    }
  };

  const changeRegistrationStep = () => {
    if (registrationStep < 3) {
      setRegistrationStep(registrationStep + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("../images/loginImg.jpg")}
      ></Image>

      {keyboardState === false ? (
        <Text style={styles.screenTitle}>Welcome to</Text>
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

      <View style={{ ...styles.formContainer }}>
        <View
          style={{
            ...styles.formSection,
            borderBottomWidth: 0,
            borderBottomColor: "white",
          }}
        >
          <Text style={{ ...styles.formTitle }}>Create Account</Text>
        </View>
        <View style={styles.formSection}>
          {userIcon}
          <TextInput
            style={styles.registerInput}
            placeholder="Full Name"
            placeholderTextColor="#999"
            onChangeText={setFullName}
            value={fullname}
          />
        </View>
        <View style={styles.formSection}>
          {userIcon}
          <TextInput
            style={styles.registerInput}
            placeholder="Email"
            placeholderTextColor="#999"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.formSection}>
          {userIcon}
          <TextInput
            style={styles.registerInput}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            onChangeText={setPhonenumber}
            value={phonenumber}
          />
        </View>
        <View style={styles.formSection}>
          {userIcon}
          <TextInput
            style={styles.registerInput}
            placeholder="Username"
            placeholderTextColor="#999"
            onChangeText={setCurrentUsername}
            value={username}
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
          onChangeText={setCurrentUsername}
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
        <TouchableOpacity
          style={{ ...styles.button, marginTop: 30 }}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text>{inputError}</Text>
      </View>
    </SafeAreaView>
  );
}
