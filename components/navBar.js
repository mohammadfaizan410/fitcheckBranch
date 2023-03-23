import React from 'react';
import { View, Text } from 'react-native';
import styles from './navBar.style';
import { Button } from '@rneui/base';

function NavBar({changeLoginState}) {

  function logout () {
    changeLoginState(false);
  };

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Welcome to the Navbar</Text>
          <Button onPress={logout}  
          buttonStyle={{ backgroundColor: 'rgb(157, 47, 47)' }}
          >
            Logout
          </Button>
      </View>
    );
  }
  
  export default NavBar;