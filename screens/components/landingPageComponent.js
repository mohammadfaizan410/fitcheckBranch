import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { useDispatch, useSelector, useRef } from "react-redux";
import styles from "./landingComponent.style";
import homeImg1 from '../../images/homeImg1.png';
import homeImg2 from '../../images/homeImg2.png';
import homeImg3 from '../../images/homeImg3.png';

export default function LandingPageComponent() {
  const {
    pageIndex
  } = useSelector((state) => state.user);
  
  let image;

  if (pageIndex === 1) {
    image = homeImg1;
  } else if (pageIndex === 2) {
    image = homeImg2;
  } else if (pageIndex === 3) {
    image = homeImg3;
  }
  else {
    // Set a default image in case the index is not 1 or 2
    image = homeImg1;
  }

  return (
    <View style={styles.loginTop}>
      <View style={{ ...styles.logoContainer}}>
        <Image style={{ ...styles.logo }} source={require("../../images/logoAndText.png")}></Image>  
          </View>
      <View style={{ ...styles.titleView, top: '10%' }}>
        <Image style={{ ...styles.mainImg, marginBottom: 30 }} source={image} />
          <Text style={{...styles.title, textAlign:'center', fontSize: 30,fontWeight: 400}}>Go Live!</Text>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center' }}>
            <Text style={{ ...styles.title, fontWeight: 400, fontSize: 15 }}>Swipe to learn More</Text>
            <Image style={{ width: 20, height: 10, marginLeft: 10 }} source={require("../../images/arrow.png")}></Image>
            </View>
            {/* if selected use filled */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }} >
            <Image style={{ width: 10, height: 10, marginLeft:5}} source={require("../../images/EllipseEmpty.png")}></Image>
          <Image style={{ width: 10, height: 10, marginLeft: 5 }} source={pageIndex===1 ? require("../../images/EllipseFull.png") : require("../../images/EllipseEmpty.png")}></Image>
            <Image style={{ width: 10, height: 10, marginLeft:5}}  source={pageIndex===2 ? require("../../images/EllipseFull.png") : require("../../images/EllipseEmpty.png")}></Image>
            <Image style={{ width: 10, height: 10, marginLeft:5}}  source={pageIndex===3 ? require("../../images/EllipseFull.png") : require("../../images/EllipseEmpty.png")}></Image>
            </View>
          </View>
          </View>
  );
}
