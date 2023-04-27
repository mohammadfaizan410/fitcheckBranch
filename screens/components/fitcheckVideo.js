import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./navbar";
import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
  setPageRefresher,
} from "../../reducers/user";
import { Video } from "expo-av";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "./fitcheckVideo.style";
import { SafeAreaView } from "react-native";

export default function FitcheckVideo({
  navigation,
  fitcheck,
  otherUserObject,
}) {
  //Redux Store data
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    currentusername,
    fullname,
    followers,
    following,
    fitcheckArray,
    pageRefresher,
  } = useSelector((state) => state.user);
  dispatch(setPageRefresher(!pageRefresher));

  if (!otherUserObject) {
    console.log("OTHER UERNAME NOT SET: FITCHECK VIDEO");

    const [imageUri, setImageUri] = useState(null);

    const fetchVideo = () => {
      const formData = {
        username: currentusername,
        filename: fitcheck.video.postername,
      };
      const response = fetch(
        "http://192.168.1.30:3000/getfile" ||
          "http://192.168.1.30:3000/getfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          const blob = response.blob();
          return blob;
        })
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            setImageUri(base64data);
          };
        });
    };

    useEffect(() => {
      fetchVideo();
    }, []);

    const handleFitcheckPress = (fitcheckObject) => {
      const formData = {
        username: currentusername,
        fitcheckId: fitcheckObject.id,
      };

      fetch(
        "http://192.168.1.30:3000/getfitcheckdata" ||
          "http://192.168.1.30:3000/getfitcheckdata",
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
          navigation.navigate("Fitcheck", { fitcheck: fitcheck });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => handleFitcheckPress(fitcheck)}
          style={{ width: "100%", height: "100%" }}
        >
          {imageUri ? (
            <Image
              style={{ width: '100%', height: "100%", borderRadius: 30, resizeMode: 'contain'}}
              source={{
              uri: imageUri,
              }}
            />
          ) : (
            <Text>Loading</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  } else {
    console.log("OTHER UERNAME SET: FITCHECK VIDEO");
    const otherUser = otherUserObject;

    const [imageUri, setImageUri] = useState(null);

    const fetchVideo = () => {
      const formData = {
        username: otherUser.username,
        filename: fitcheck.video.postername,
      };
      const response = fetch(
        "http://192.168.1.30:3000/getfile" ||
          "http://192.168.1.30:3000/getfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          const blob = response.blob();
          return blob;
        })
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            setImageUri(base64data);
          };
        });
    };

    useEffect(() => {
      fetchVideo();
    }, []);

    const handleFitcheckPress = (fitcheckObject) => {
      const formData = {
        username: otherUser.username,
        fitcheckId: fitcheckObject.id,
      };

      fetch(
        "http://192.168.1.30:3000/getfitcheckdata" ||
          "http://192.168.1.30:3000/getfitcheckdata",
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
          console.log(data);
          navigation.navigate("Fitcheck", {
            fitcheck: data.fitcheck,
            otherUser: otherUser,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => handleFitcheckPress(fitcheck)}>
          {imageUri ? (
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: imageUri,
              }}
            />
          ) : (
            <Text>Loading</Text>
          )}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            {fitcheck.caption}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
