import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import * as FileSystem from 'expo-file-system';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from './feedComponent.style'
import { Video } from "expo-av";



export default function Feed() {
    const homeIcon = <Icon name="home" size={30} />;
    const feedIcon = <Icon name="feed" size={30} />;
    const addIcon = <Icon name="hacker-news" size={70} />;
    const commentIcon = <Icon name="comment-o" size={30} />;
  const userIcon = <Icon name="user" size={30} />;
  const [isPlaying, setIsPlaying] = useState(false);


    return (
        <View style={styles.homeFeed}> 
              
        </View>
  )
}
