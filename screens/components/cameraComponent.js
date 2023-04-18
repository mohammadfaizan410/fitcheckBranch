import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import styles from './cameraComponent.styles'
import { Camera } from "expo-camera";
import * as FileSystem from 'expo-file-system';



export default function CameraComponent({ navigation }) {
    const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoData, setPhotoData] = useState(null);

    function toggleCameraType() {
      setType(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
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
      console.log(base64)
    }
  };
    useEffect(() => {
      (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
  
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return(
    <SafeAreaView style={styles.container}>
        <Camera  ref={(ref) => setCameraRef(ref)} style={styles.camera} type={type}>
        </Camera>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
        <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
          
        <TouchableOpacity style={styles.takeButton} onPress={takePicture}>
        <Text style={styles.buttonText}>Take</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.takeButton,  left: '0%' }} >
        <Text style={styles.buttonText}>Video</Text>
        </TouchableOpacity>
      
</SafeAreaView>
  )
}

