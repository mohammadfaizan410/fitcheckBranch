import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';


export default function CameraComponent() {
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [permission, setPermission] = useState(null);

  async function toggleRecording() {
    if (cameraRef.current && !isRecording) {
      try {
        await cameraRef.current.recordAsync();
        setIsRecording(true);
      } catch (error) {
        console.log('Error recording video: ', error);
      }
    } else {
      cameraRef.current.stopRecording();
      setIsRecording(false);
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
    async function getPermission() {
        const { status } = await Camera.requestCameraPermissionsAsync();
                            await Camera.requestMicrophonePermissionsAsync()
        setPermission(status === 'granted');
      }
      getPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              margin: 20,
            }}
            onPress={toggleCameraType}
          >
            <FontAwesome name="camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              margin: 20,
            }}
            onPress={toggleRecording}
          >
            <FontAwesome
              name={isRecording ? 'stop-circle' : 'circle'}
              size={40}
              color={isRecording ? 'red' : 'white'}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}