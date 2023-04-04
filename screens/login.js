import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './login.style';


export default function Login({navigation}) {

  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({});

  const handleLogin = () => {

    const formData = {
      email: "",
      username:username,
      password: password,
      id: username,

    };
    
    fetch('http://192.168.1.30:3000/login', { //replace with server IP later
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => 
      {
        res.json()
      })
    .then(data => {
      console.log(data);
      setIsLoggedIn(true);
    })
    .catch(err => {
      console.error(err)
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>

      <Text style={styles.title}>Fitcheck</Text>


      <Text style={styles.subtitle}>Username:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Enter your Username"
        placeholderTextColor="#999"
        onChangeText={setUsername}
        value={username}
      />

  <Text style={styles.subtitle}>Password:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Enter your Password"
        placeholderTextColor="#999"
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
      />

  <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {isLoggedin}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
      <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      </View>
    </View>
  );

}

