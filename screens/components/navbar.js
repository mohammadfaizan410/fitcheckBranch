import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
// import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./navbar.style";

export default function Navbar({ navigation }) {
  const homeIcon = <Icon name="home" size={30} />;
  const feedIcon = <Icon name="feed" size={30} />;
  const addIcon = <Icon name="hacker-news" size={70} />;
  const commentIcon = <Icon name="comment-o" size={30} />;
  const userIcon = <Icon name="user" size={30} />;

  return (
    <View style={styles.navContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Feed", { otherUser: undefined })}
        >
          <View style={styles.innerContainer}>
            {homeIcon}
            <Text>Home</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Feed", { otherUser: undefined })}
        >
          <View style={styles.innerContainer}>
            {feedIcon}
            <Text>Feed</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Video", { otherUser: undefined })}
        >
          <View style={styles.innerContainer}>{addIcon}</View>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <View style={styles.innerContainer}>
            {commentIcon}
            <Text>activity</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", { otherUser: undefined })
          }
        >
          <View style={styles.innerContainer}>
            {userIcon}
            <Text>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
