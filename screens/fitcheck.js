import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
  setListingArray,
} from "../reducers/user";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "./fitcheck.style";

export default function Fitcheck({ navigation, route }) {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    username,
    fullname,
    followers,
    following,
    fitcheckArray,
    listingArray,
  } = useSelector((state) => state.user);
  const { fitcheck } = route.params;
  const [likes, setLikes] = useState(fitcheck.likes);
  const [retrievedListings, setRetrievedListings] = useState([]);

  useEffect(() => {}, [likes]);

  const handleLike = () => {
    const formData = {
      username: username,
      fitcheckId: fitcheck.id,
    };
    fetch(
      "http://192.168.1.30:3000/addLikes" ||
        "http://192.168.1.30:3000/addLikes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLikes(data.likes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchListings = () => {
    const formData = {
      username: username,
      fitcheckId: fitcheck.id,
    };
    fetch(
      "http://192.168.1.30:3000/getallListingdata" ||
        "http://192.168.1.30:3000/getallListingdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRetrievedListings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchListings();
  }, [listingArray]);

  const handleAddListing = (fitcheckId) => {
    navigation.navigate("AddListing", { fitcheck: fitcheck });
  };

  const handleListingPress = (listingObject) => {
    const formData = {
      username: username,
      fitcheckId: fitcheck.id,
      listingId: listingObject.id,
    };

    fetch(
      "http://192.168.1.20:3000/getlistingdata" ||
        "http://192.168.1.30:3000/getlistingdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigation.navigate("Listing", {
          listing: data.listing,
          fitcheckId: fitcheck.id,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Load All Listings Helper for Sub-Images
  const renderListingImagesHelper = ({ item }) => (
    <View style={{ ...styles.fitcheckContainer, width: "30%" }}>
      <View key={index} style={{ ...styles.imageContainer }}>
        <TouchableOpacity onPress={() => handleListingPress(item)}>
          <Image
            style={{ ...styles.image }}
            source={{ uri: `data:${image.contentType};base64,${image.data}` }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Load All Listings
  const renderListingImages = ({ item }) => (
    <View
      style={{
        ...styles.listingImagecontainer,
      }}
    >
      <View style={styles.listingTitleContainer}>
        <Text style={styles.listingTitleText}>{item.name}</Text>
      </View>

      {item.images.map((image, index) => (
        <View
          key={index}
          style={{ ...styles.listingImagecontainer, width: "100%" }}
        >
          <TouchableOpacity onPress={() => handleListingPress(item)}>
            <Image
              style={{ ...styles.listingImage }}
              source={{ uri: `data:${image.contentType};base64,${image.data}` }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.fitcheckContainer}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.imageContainer}>
              <Image
                style={{ ...styles.image }}
                source={{
                  uri: `data:${fitcheck.contentType};base64,${fitcheck.data}`,
                }}
              />
            </View>
            <View style={styles.captionContainer}>
              <Text style={styles.description}>{fitcheck.caption}</Text>
              <Text>Likes {likes}</Text>
            </View>

            <TouchableOpacity
              style={[styles.button, { alignSelf: "center" }]}
              onPress={handleLike}
            >
              <Text style={[styles.buttonText]}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { alignSelf: "center" }]}
              onPress={() => handleAddListing(fitcheck.id)}
            >
              <Text style={[styles.buttonText]}>Add Listing</Text>
            </TouchableOpacity>
            <View style={styles.listingTitleContainer}>
              <Text style={[styles.listingTitleTextLarge]}>
                Current Listings
              </Text>
            </View>
          </>
        }
        data={retrievedListings}
        renderItem={renderListingImages}
        keyExtractor={(item) => item.id}
        key={1}
        numColumns={1}
      />
    </SafeAreaView>
  );
}
