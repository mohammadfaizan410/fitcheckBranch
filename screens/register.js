import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import styles from './register.style';


export default function Register({navigation}) {

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {

    const formData = {
      fullname: fullname,
      email: email,
      username:username,
      password: password,
      id: username,

    };
    
    fetch('http://192.168.1.30:3000/register', { //replace with server IP later
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.subtitle} >Full Name:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#999"
        onChangeText={setFullName}
        value={fullname}
      />

      <Text style={styles.subtitle}>Email:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />

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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
      <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>

      </View>
    </View>
  );

}
