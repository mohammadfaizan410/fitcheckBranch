import { PermissionsAndroid, Platform, Alert } from 'react-native';

// Function to request camera permission
// async function requestCameraPermission() {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs camera permission to capture photos.',
//           buttonPositive: 'OK',
//           buttonNegative: 'Cancel',
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Camera permission granted');
//       } else {
//         console.log('Camera permission denied');
//       }
//     } catch (error) {
//       console.error('Failed to request camera permission:', error);
//     }
//   } else if (Platform.OS === 'ios') {
//     // iOS doesn't require explicit permission
//     console.log('Camera permission granted');
//   } else {
//     console.log('Platform not supported');
//   }
// }

//////////////////////////////////////////////////////////////////////////////////
function requestCameraPermissionWindow() {
    // Check if the browser supports getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request camera access
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          console.log('Camera permission granted');
        })
        .catch((error) => {
          console.log('Camera permission denied:', error);
        });
    } else {
      console.log('Browser does not support getUserMedia');
    }
  }

// export { requestCameraPermission, requestCameraPermissionWindow };
export { requestCameraPermissionWindow };