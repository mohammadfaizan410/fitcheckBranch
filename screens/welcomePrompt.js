import React from "react";
import { View, Text, Image, SafeAreaView} from "react-native";

import styles from './welcomePrompt.styles'
export default function WelcomePrompt(props) {
  return (
      <SafeAreaView style={styles.container}>
        <View style={{ ...styles.logoContainer}}>
            <Image style={{ ...styles.logo }} source={require("../images/logoAndText.png")}></Image>  
          </View>
   <Text style={styles.promptTitle}>The world of resale is ready for you!</Text>
    </SafeAreaView>
  );
}
