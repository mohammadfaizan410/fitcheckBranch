import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./cameraComponent.styles";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import IconFoundation from "react-native-vector-icons/Foundation";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

export default function CameraComponent({ navigation }) {
  const loopIcon = <IconFoundation name="loop" size={30} color="white" />;
  const circleIcon = (
    <IconFontisto name="circle-o-notch" size={70} color="white" />
  );
  const galleryIcon = (
    <IconMaterialCommunity name="view-gallery" size={30} color="white" />
  );
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoData, setPhotoData] = useState(null);

  function toggleCameraType() {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const base64 = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setPhotoUri(photo.uri);
      setPhotoData(base64);
      setPhotoUri(photo.uri);
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={(ref) => setCameraRef(ref)}
        style={styles.camera}
        type={type}
      ></Camera>

      <View style={{ ...styles.navContainer, top: "80%" }}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={toggleCameraType}>
            <View style={styles.innerContainer}>
              <Text>Image</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.innerContainer}>
              <Text>Video</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navContainer}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={toggleCameraType}>
            <View style={styles.innerContainer}>{loopIcon}</View>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.innerContainer}>{circleIcon}</View>
          </TouchableOpacity>
        </View>

        <View style={styles.innerContainer}>
          <TouchableOpacity>
            <View style={styles.innerContainer}>{galleryIcon}</View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
