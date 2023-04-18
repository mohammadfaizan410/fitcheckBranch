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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import styles from "./addListing.style";

export default function AddListing({ navigation, route }) {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    username,
    fullname,
    followers,
    following,
    fitcheckArray,
  } = useSelector((state) => state.user);

  const [listingname, setListingname] = useState();
  const [listingdescription, setListingdescription] = useState();
  const [listingcategory, setListingcategory] = useState();
  const [listingsize, setListingsize] = useState();
  const [listingbrand, setListingbrand] = useState();
  const [listingcondition, setListingcondition] = useState();
  const [listingpackagesize, setListingpackagesize] = useState();
  const [listingprice, setListingprice] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const { fitcheck } = route.params;

  // pick image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
  const uploadImage = async () => {
    if (!selectedImage) {
      alert("No image selected!");
      return;
    }

    const base64Image = await FileSystem.readAsStringAsync(selectedImage, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = {
      username: username,
      fitcheckId: fitcheck.id,
      name: listingname,
      description: listingdescription,
      category: listingcategory,
      size: listingsize,
      brand: listingbrand,
      condition: listingcondition,
      packagesize: listingpackagesize,
      price: listingprice,

      image: base64Image,
    };

    fetch(
      "http://192.168.1.30:3000/uploadnewlisting" ||
        "http://192.168.1.20:3000/uploadnewlisting",
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
        console.log("Success: ", result);
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.error(error);
        navigation.navigate("Profile");
      });
  };

  return (
    <ScrollView>
      <View style={styles.captionContainer}>
        <Text>{fitcheck.filename} </Text>
      </View>
      <Text style={styles.subtitle}>Listing Name </Text>
      <TextInput
        style={styles.input}
        placeholder="Listing Name"
        placeholderTextColor="#999"
        onChangeText={setListingname}
        value={listingname}
      />
      <Text style={styles.subtitle}>Listing Description </Text>
      <TextInput
        style={styles.input}
        placeholder="Listing Desciription"
        placeholderTextColor="#999"
        onChangeText={setListingdescription}
        value={listingdescription}
      />
      <Text style={styles.subtitle}>Listing Category </Text>
      <Picker
        selectedValue={listingcategory}
        onValueChange={(itemValue, itemIndex) => setListingcategory(itemValue)}
      >
        <Picker.Item label="Jeans" value="Jeans" />
        <Picker.Item label="Shirt" value="Shirt" />
        <Picker.Item label="Coat" value="Coat" />
        <Picker.Item label="Bomber" value="Bomber" />
      </Picker>

      <Text style={styles.subtitle}>Listing Size </Text>
      <Picker
        selectedValue={listingsize}
        onValueChange={(itemValue, itemIndex) => setListingsize(itemValue)}
      >
        <Picker.Item label="S" value="S" />
        <Picker.Item label="M" value="M" />
        <Picker.Item label="L" value="L" />
        <Picker.Item label="XL" value="XL" />
        <Picker.Item label="XXL" value="XXL" />
        <Picker.Item label="XXXL" value="XXXL" />
      </Picker>

      <Text style={styles.subtitle}>Listing Brand </Text>
      <Picker
        selectedValue={listingbrand}
        onValueChange={(itemValue, itemIndex) => setListingbrand(itemValue)}
      >
        <Picker.Item label="P&B" value="P&B" />
        <Picker.Item label="Addidas" value="Addidas" />
        <Picker.Item label="Nike" value="Nike" />
      </Picker>

      <Text style={styles.subtitle}>Listing Condition </Text>
      <Picker
        selectedValue={listingcondition}
        onValueChange={(itemValue, itemIndex) => setListingcondition(itemValue)}
      >
        <Picker.Item label="Fresh" value="Fresh" />
        <Picker.Item label="Mildly User" value="Mildly Used" />
        <Picker.Item label="Wearable" value="Wearable" />
      </Picker>

      <Text style={styles.subtitle}>Listing Package Size </Text>
      <Picker
        selectedValue={listingpackagesize}
        onValueChange={(itemValue, itemIndex) =>
          setListingpackagesize(itemValue)
        }
      >
        <Picker.Item label="< 1kg" value="< 1kg" />
        <Picker.Item label="< 2kg" value="< 2kg" />
        <Picker.Item label="< 3kg" value="< 3kg" />
        <Picker.Item label="< 4kg" value="< 4kg" />
      </Picker>

      <Text style={styles.subtitle}>Listing Price </Text>
      <TextInput
        style={styles.input}
        placeholder="Listing Price"
        placeholderTextColor="#999"
        onChangeText={setListingprice}
        value={listingprice}
      />

      {selectedImage && (
        <View>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick a image from camera roll</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>
          Upload Listing Image and Save Listing
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
