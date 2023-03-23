import React from 'react';
import { View, Text } from 'react-native';
import styles from './login.style';
import { Button } from '@rneui/base';

function Login({changeLoginState}) {

  function handleLogin () {
    changeLoginState(true);
  };

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Welcome to the Login screen!</Text>
          <Button onPress={handleLogin}  
          buttonStyle={{ backgroundColor: 'rgb(157, 47, 47)' }}
          >
            Login
          </Button>
      </View>
  );

}

export default Login;
