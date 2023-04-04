import React from 'react';
import { View, Text, TextInput, Button} from 'react-native';



export default function NavBar({changeLoginState}) {

  function handlelogout () {
    changeLoginState(false);
  };

    return (
      <View>
      <Text>Welcome to the Navbar</Text>
      <Button > Logout </Button>
      </View>
    );
  }
