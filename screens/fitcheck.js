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
  setPageRefresher,
} from "../reducers/user";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";

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
    currentusername,
    fullname,
    followers,
    following,
    fitcheckArray,
    listingArray,
    pageRefresher,
  } = useSelector((state) => state.user);
  dispatch(setPageRefresher(!pageRefresher));

  if (!(route && route.params && route.params.otherUser !== undefined)) {
    console.log("OTHER USERNAME NOT SET: Fitcheck");

    const fitcheck = route.params.fitcheck;

    const [likes, setLikes] = useState(fitcheck.likes);
    const [retrievedListings, setRetrievedListings] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoUri, setVideoUri] = useState(null);

    const path = fitcheck.video.filename;

    const getFile = async () => {
      const formData = {
        username: currentusername,
        filename: fitcheck.video.filename,
      };
      const response = await fetch(
        "http://192.168.1.24:3000/getfile" ||
          "http://192.168.1.24:3000/getfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setVideoUri(base64data);
      };
    };

    useEffect(() => {
      getFile();
    }, []);

    const togglePlaying = () => {
      setIsPlaying(!isPlaying);
    };

    useEffect(() => {}, [likes]);

    const handleLike = () => {
      const formData = {
        username: currentusername,
        fitcheckId: fitcheck.id,
      };
      fetch(
        "http://192.168.1.24:3000/modifyLikes" ||
          "http://192.168.1.24:3000/modifyLikes",
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

    useEffect(() => {
      fetchLikes();
    }, []);

    const fetchLikes = () => {
      const formData = {
        fitcheckId: fitcheck.id,
      };
      fetch(
        "http://192.168.1.24:3000/getLikes" ||
          "http://192.168.1.24:3000/getLikes",
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
        username: currentusername,
        fitcheckId: fitcheck.id,
      };
      fetch(
        "http://192.168.1.24:3000/getallListingdata" ||
          "http://192.168.1.24:3000/getallListingdata",
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
        username: currentusername,
        fitcheckId: fitcheck.id,
        listingId: listingObject.id,
      };

      fetch(
        "http://192.168.1.24:3000/getlistingdata" ||
          "http://192.168.1.24:3000/getlistingdata",
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
                source={{
                  uri: `data:${image.contentType};base64,${image.data}`,
                }}
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
                <TouchableOpacity
                  onPress={togglePlaying}
                  style={{
                    ...styles.preview,
                    borderColor: "black",
                    borderWidth: 2,
                  }}
                >
                  {videoUri ? (
                    <Video
                      source={{ uri: videoUri }}
                      style={styles.previewVideo}
                      shouldPlay={isPlaying}
                      isLooping
                      resizeMode="cover"
                    />
                  ) : (
                    <Text>Loading</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.captionContainer}>
                <Text style={styles.description}>{fitcheck.caption}</Text>
                <Text>Likes {likes.length}</Text>
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
  } else {
    console.log("OTHER USERNAME SET: Fitcheck");
    const otherUser = route.params.otherUser;

    const fitcheck = route.params.fitcheck;
    const [likes, setLikes] = useState(fitcheck.likes);
    const [retrievedListings, setRetrievedListings] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoUri, setVideoUri] = useState(null);

    const path = fitcheck.video.filename;

    const getFile = async () => {
      const formData = {
        username: otherUser.username,
        filename: fitcheck.video.filename,
      };
      const response = await fetch(
        "http://192.168.1.24:3000/getfile" ||
          "http://192.168.1.24:3000/getfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setVideoUri(base64data);
      };
    };

    useEffect(() => {
      getFile();
    }, []);

    function togglePlaying() {
      setIsPlaying(!isPlaying);
    }

    useEffect(() => {}, [likes]);

    const handleLike = () => {
      const formData = {
        username: otherUser.username,
        fitcheckId: fitcheck.id,
      };
      fetch(
        "http://192.168.1.24:3000/modifyLikes" ||
          "http://192.168.1.24:3000/modifyLikes",
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

    useEffect(() => {
      fetchLikes();
    }, []);

    const fetchLikes = () => {
      const formData = {
        fitcheckId: fitcheck.id,
      };
      fetch(
        "http://192.168.1.24:3000/getLikes" ||
          "http://192.168.1.24:3000/getLikes",
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
        username: otherUser.username,
        fitcheckId: fitcheck.id,
      };
      fetch(
        "http://192.168.1.24:3000/getallListingdata" ||
          "http://192.168.1.24:3000/getallListingdata",
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
        username: otherUser.username,
        fitcheckId: fitcheck.id,
        listingId: listingObject.id,
      };

      fetch(
        "http://192.168.1.24:3000/getlistingdata" ||
          "http://192.168.1.24:3000/getlistingdata",
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
                source={{
                  uri: `data:${image.contentType};base64,${image.data}`,
                }}
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
                <TouchableOpacity
                  onPress={togglePlaying}
                  style={{
                    ...styles.preview,
                    borderColor: "black",
                    borderWidth: 2,
                  }}
                >
                  {videoUri ? (
                    <Video
                      source={{ uri: videoUri }}
                      style={styles.previewVideo}
                      shouldPlay={isPlaying}
                      isLooping
                      resizeMode="cover"
                    />
                  ) : (
                    <Text>Loading</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.captionContainer}>
                <Text style={styles.description}>{fitcheck.caption}</Text>
                <Text>Likes {likes.length}</Text>
              </View>

              <TouchableOpacity
                style={[styles.button, { alignSelf: "center" }]}
                onPress={handleLike}
              >
                <Text style={[styles.buttonText]}>Like</Text>
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
}
