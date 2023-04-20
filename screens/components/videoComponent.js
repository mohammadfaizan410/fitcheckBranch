import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import styles from './videoComponent.style';
import IconFoundation from "react-native-vector-icons/Foundation";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
export default function CameraComponent({ navigation }) {
  const cameraRef = React.useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [permission, setPermission] = useState(null);
  const [videoRecorded, setVideoRecorded] = useState(false)
  const loopIcon = <IconFoundation name="loop" size={30} color='white'/>;
  const circleIcon = <IconFontisto name="circle-o-notch" size={70} color='white'/>;
  const galleryIcon = <IconMaterialCommunity name="view-gallery" size={30} color='white' />;
  const [uri, setUri] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const playIcon = <Icon name='playcircleo' size={70} color='white'/>
  const pauseIcon = <Icon name='pausecircleo' size={70} color='white' />
  
  function togglePlaying() {
    setIsPlaying(!isPlaying);
    }






  const getPermission = useCallback(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    await Camera.requestMicrophonePermissionsAsync();
    setPermission(status === 'granted');
  }, []);



  async function startRecording() {
    try {
      if (cameraRef.current) {
        if (!isRecording) {
          setIsRecording(true);
          const videoUri = await cameraRef.current.recordAsync();
          setVideoRecorded(true);
          setUri(videoUri.uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function stopRecording() {
    if (cameraRef.current) {
      if (isRecording) {
        setIsRecording(false);
        await cameraRef.current.stopRecording();
        console.log('recording stopped')
      }
    }
  }

  function toggleCameraType() {
    setType((currentType) =>
      currentType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }
  useEffect(() => {
    let isMounted = true;
  
    async function getPermission() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await Camera.requestMicrophonePermissionsAsync();
      if (isMounted) {
        setPermission(status === 'granted');
      }
    }
  
    getPermission();
  
    return () => {
      isMounted = false;
    };
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      getPermission();
    }, [])
  );
  if (videoRecorded === false) {
    
    return (    
      <SafeAreaView style={styles.container}>
      {permission && (
        <Camera style={ styles.camera} type={type} ref={cameraRef}>
        </Camera>
      )}
      <View style={{ ...styles.navContainer }}> 
            <View style={styles.innerContainer}>
            <TouchableOpacity onPress={toggleCameraType}>
                <View style={styles.innerContainer}>
                { loopIcon }
                </View>
            </TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
            <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
                <View style={styles.innerContainer}>
                    { circleIcon }
                </View>
                </TouchableOpacity>
                </View>
                
                <View style={styles.innerContainer}>
                <TouchableOpacity>
                <View style={styles.innerContainer}>
                { galleryIcon }
                </View>
                </TouchableOpacity>
            </View>
        </View>      
    </SafeAreaView>
  
    );
  }
  if (videoRecorded === true) {

    return (
      <SafeAreaView style={styles.container}>
      <Video
      source={{ uri: uri }}
      style={styles.preview}
      resizeMode="contain"
      shouldPlay={isPlaying}
      isLooping
      />
    <View style={{ ...styles.navContainer }}> 
          <View style={styles.innerContainer}>
          <TouchableOpacity onPress={()=> setVideoRecorded(false)}>
              <View style={styles.innerContainer}>
                  <Text style={{color: 'white'}}>Discard</Text>
              </View>
          </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
          <TouchableOpacity onPress={togglePlaying}>
              <View style={styles.innerContainer}>
                        {isPlaying ? pauseIcon : playIcon }
              </View>
          </TouchableOpacity>
          </View>

          <View style={styles.innerContainer}>
          <TouchableOpacity onPress={()=> navigation.navigate('')}>
              <View style={styles.innerContainer}>
                 <Text style={{color: 'white'}}>Save</Text>
              </View>
          </TouchableOpacity>
          </View>
      </View>      
  </SafeAreaView>
   
    )
  }
}