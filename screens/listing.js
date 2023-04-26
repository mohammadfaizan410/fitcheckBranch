import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import styles from "./listing.style";

export default function Listing({ navigation, route, otherUserUsername }) {
  if (!otherUserUsername) {
    //Check for changes if new screen
    useEffect(() => {
      const unsubscribe = navigation.addListener("state", () => {
        console.log("Navigation state changed");
      });

      return unsubscribe;
    }, [navigation]);

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
    const listing = route.params.listing;
    const images = listing.images;
    const listingId = listing.id;
    const fitcheckId = route.params.fitcheckId;
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {}, [listingArray]);

    console.log(fitcheckId);

    // pick image
    const pickImage = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access camera roll is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    };

    //upload image
    const uploadImage = async (fitcheckid, listingid) => {
      if (!selectedImage) {
        alert("No image selected!");
        return;
      }

      const base64Image = await FileSystem.readAsStringAsync(selectedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = {
        username: username,
        fitcheckId: fitcheckId,
        listingId: listingId,
        image: base64Image,
      };

      fetch(
        "http://192.168.1.22:3000/uploadnewlistingimage" ||
          "http://192.168.1.22:3000/uploadnewlistingimage",
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
        .then((result) => {
          console.log("Listing Added: ", result);
          const { newListingArrayObject } = {
            fitcheckId: result.fitcheckId,
            listingId: result.listingId,
          };
          const newListingArray = [...listingArray, newListingArrayObject];
          dispatch(setListingArray(newListingArray));
          navigation.goBack();
        })
        .catch((error) => {
          console.error(error);
          navigation.navigate("Profile");
        });
    };

    const handleAddListingImages = (listingId) => {
      uploadImage(fitcheckId, listingId);
    };

    // Load Listing Images
    const renderImages = ({ item }) => (
      <View style={{ ...styles.fitcheckContainer, width: "30%" }}>
        <View style={{ ...styles.imageContainer }}>
          <TouchableOpacity>
            <Image
              style={{ ...styles.image }}
              source={{ uri: `data:${item.contentType};base64,${item.data}` }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <SafeAreaView style={styles.fitcheckContainer}>
        {selectedImage && (
          <View>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick a image from camera roll</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddListingImages(listing.id)}
        >
          <Text style={[styles.buttonText]}>Add Listing Images</Text>
        </TouchableOpacity>
        <FlatList
          data={images}
          renderItem={renderImages}
          keyExtractor={(item) => item.id}
          key={3}
          numColumns={3}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.fitcheckContainer}>
        <Text style={styles.description}>Other User Listing</Text>
      </SafeAreaView>
    );
  }
}
