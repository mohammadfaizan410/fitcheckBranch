import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import styles from "./landingComp.style";
export default function LandingPageComponent({ navigation, index }) {


  return (
    <View style={styles.loginTop}> 
            
          <View style={{ ...styles.titleView, top: '-10%', flexDirection:'row'}}>
            <Text style={{ ...styles.title, color:"#3E0099", marginLeft:20, fontSize:50, fontFamily: 'Neurial Grotesk', fontStyle:'normal' }}>FitCheck</Text>
          </View>
         
          <View style={{ ...styles.titleView, top: '50%' }}>
            <Text style={{ ...styles.title, fontFamily: 'Open Sans', fontWeight: 400, fontSize:30 }}>Resale, renewed</Text>
          </View>
          <View style={{ ...styles.titleView, top: '67%' }}>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center' }}>
            <Text style={{ ...styles.title, fontFamily: 'Open Sans', fontWeight: 400, fontSize: 15 }}>Swipe to learn More</Text>
            <Image style={{ width: 20, height: 10, marginLeft: 10 }} source={require("../../images/arrow.png")}></Image>
            </View>
            {/* if selected use filled */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }} >
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../../images/EllipseEmpty.png")}></Image>
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../../images/EllipseEmpty.png")}></Image>
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../../images/EllipseEmpty.png")}></Image>
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../../images/EllipseEmpty.png")}></Image>
            </View>
          </View>
          </View>
  );
}
