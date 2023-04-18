import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector, useRef } from "react-redux";
import homeImg1 from '../images/homeImg1.png';
import homeImg2 from '../images/homeImg2.png';
import homeImg3 from '../images/homeImg3.png';
import styles from './shopSetup.style'
export default function ShopSetup(props) {
const [isFirstLogin, setIsFirstLogin] = useState(false)
  return (
      <SafeAreaView style={styles.container}>
        <View style={{ ...styles.logoContainer}}>
            <Image style={{ ...styles.logo }} source={require("../images/logoAndText.png")}></Image>  
      </View>
      <Text style={styles.shopTitle}>Set up your Shop!</Text>
      
      
      <View style={styles.formContainer}>
        <View style={{ ...styles.formSection,   borderBottomWidth: 0,
            borderBottomColor: "white" }}>
          <Text style={{...styles.formTitle, fontSize: 20, color: 'grey' }}>Set up your credentials</Text>
        </View>  
        <View style={{ ...styles.formSection }}>
        <TextInput
            style={styles.shopInput}
            placeholder="Username"
            placeholderTextColor="#999"
          />
        </View>
        <View style={{ ...styles.formSection }}>
        <TextInput
            style={styles.shopInput}
            placeholder="Shop's Name/ Display Name"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={{ ...styles.button, marginTop: 30 }}
        >
          <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          
      </View>
    </SafeAreaView>
  );
}
