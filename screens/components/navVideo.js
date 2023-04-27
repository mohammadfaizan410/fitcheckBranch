import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Font5Icon from "react-native-vector-icons/FontAwesome5";
import FontIcon from "react-native-vector-icons/FontAwesome";
import styles from "./navVideo.style";
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
} from "../../reducers/user";

export default function NavVideo({ navigation, fitcheck }) {
  const heartEmpty = <AntDesignIcon name="heart" size={30} color={"#F6F5F4"} />;
  const heartFull = <AntDesignIcon name="heart" size={30} color={"red"} />;
  const commentIcon = (
    <Font5Icon name="comment-alt" size={30} color={"#F6F5F4"} />
  );
  const shareIcon = <FontIcon name="share" size={30} color={"#F6F5F4"} />;
  const [listings, setListings] = useState("");
  const listingImages = [];
  const uriPrefix = "data:image/jpeg;base64,";
  const [likes, setLikes] = useState(fitcheck.likes);
  const [isLiked, setIsLiked] = useState(false);
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

  useEffect(() => {
    const formData = {
      username: fitcheck.username,
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
        setListings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setIsLiked(likes?.includes(currentusername));
  }, [likes]);

  const handleLike = () => {
    const formData = {
      username: currentusername,
      fitcheckId: fitcheck.id,
    };
    fetch(
      "http://192.168.1.30:3000/modifyLikes" ||
        "http://192.168.1.30:3000/modifyLikes",
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
      "http://192.168.1.30:3000/getLikes" ||
        "http://192.168.1.30:3000/getLikes",
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

  if (listings !== "") {
    listings.forEach((element) => {
      listingImages.push(element.images[0].data);
    });
    const mappedImages = listingImages?.map((item) => {
      return (
        <View style={{ marginTop: "20%" }}>
          <Image
            source={{ uri: uriPrefix + item }}
            style={{
              width: 50,
              height: 50,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 10,
            }}
          />
        </View>
      );
    });
    return (
      <View style={styles.navContainer}>
        <View style={styles.listingsContainer}>{mappedImages}</View>
        <View style={styles.buttonContainer}>
          <View style={styles.innerContainer}>
            <TouchableOpacity onPress={handleLike}>
              {isLiked === true ? heartFull : heartEmpty}
            </TouchableOpacity>
            <Text style={{ color: "white" }}>{likes?.length}</Text>
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity>{commentIcon}</TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity>{shareIcon}</TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Image style={{ width: 75, height: 75 }} />
        </View>
      </View>
    );
  } else {
    return null; // or you can return a loading indicator
  }
}
