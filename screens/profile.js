import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./components/navbar";

import {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setUsername,
  setFollowers,
  setFollowing,
  setFitcheckArray,
} from "../reducers/user";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView 
} from "react-native";
import styles from "./profile.style";
import { SafeAreaView } from "react-native";

export default function Profile({ navigation }) {
  //Redux Store data
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    email,
    username,
    fullname,
    followers,
    following,
    fitcheckArray,
  } = useSelector((state) => state.user);

  const [retrievedFitchecks, setRetrievedFitchecks] = useState([]);

  const fetchFitchecks = () => {
    const formData = {
      username: username,
    };
    fetch(
      "http://192.168.1.20:3000/getallfitcheckdata" ||
        "http://192.168.1.30:3000/getallfitcheckdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRetrievedFitchecks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    //navigation.navigate("Profile");
    fetchFitchecks();
  }, [fitcheckArray]);

  const handleLogout = () => {
    dispatch(reset());
    AsyncStorage.clear();
    navigation.navigate("Landing");
  };

  const handleFitcheckPress = (fitcheckObject) => {
    const formData = {
      username: username,
      fitcheckId: fitcheckObject.id,
    };

    fetch(
      "http://192.168.1.30:3000/getfitcheckdata" ||
        "http://192.168.1.30:3000/getfitcheckdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigation.navigate("Fitcheck", { fitcheck: data.fitcheck });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  AsyncStorage.getItem("user")
    .then((storedData) => {
      const userData = JSON.parse(storedData);
      if (userData != null) {
        console.log("Stored data is: ", userData);
      } else {
        console.log("NO STORED DATA");
      }
    })
    .catch((error) => {
      console.log("Error retrieving data from AsyncStorage: ", error);
    });

  const renderFitcheckItem = ({ item }) => (
    <View style={styles.fitcheckContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleFitcheckPress(item)}>
          <Image
            style={{ ...styles.image }}
            source={{ uri: `data:${item.contentType};base64,${item.data}` }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{item.caption}</Text>
      </View>
    </View>
  );

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text >{title}</Text>
    </View>
  );
  return (
    // <View style={styles.container}>
    //   <View style={styles.rowContainer}>
    //     <Image
    //       source={require("../assets/favicon.png")}
    //       style={[styles.profilePicture, { alignSelf: "flex-start" }]}
    //     />
    //     <View style={styles.columnContainer}>
    //       <Text style={{ ...styles.title }}>{username}</Text>
    //       <Text style={{ ...styles.subtitle }}>{fullname}</Text>
    //       <Text style={{ ...styles.subtitle }}>
    //         Followers: {followers.length}
    //       </Text>
    //       <Text style={{ ...styles.subtitle }}>
    //         Following: {following.length}
    //       </Text>
    //     </View>

    //     <TouchableOpacity
    //       style={[styles.button, { alignSelf: "flex-end" }]}
    //       onPress={handleLogout}
    //     >
    //       <Text style={[styles.buttonText]}>Logout</Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => navigation.navigate("UploadFitcheck")}
    //     >
    //       <Text style={styles.buttonText}>Upload Fitcheck</Text>
    //     </TouchableOpacity>
    //   </View>
    //   {retrievedFitchecks ? (
    //     <FlatList
    //       data={retrievedFitchecks}
    //       renderItem={renderFitcheckItem}
    //       keyExtractor={(item) => item.filename}
    //       numColumns={3}
    //     />
    //   ) : (
    //     ""
    //   )}
    // </View>

    <SafeAreaView style={styles.container}>
    <View style={{height: '4%'}}>
      </View>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.imageName}>
          <Image style={styles.profileImg} source={require("../images/homeImg1.png")} />
          <Text style= {styles.name}>Muhammad Faizan</Text>
        </View>
       
      </View>
      <View style={styles.statsContainer}>
          <View style={styles.profileStats}>
            <Text style={styles.statsTitle}>Items</Text>
            <Text style={styles.statsNum}>10</Text>
          </View>
          <View style={styles.profileStats}>
            <Text style={styles.statsTitle}>Followers</Text>
            <Text style={styles.statsNum}>20</Text>
          </View>
          <View style={styles.profileStats}>

            <Text style={styles.statsTitle}>Following</Text>
            <Text style={styles.statsNum}>30</Text>
          </View>
          <View style={{...styles.profileStats, borderRightColor: 'white'}}>
            <Text style={styles.statsTitle}>Sold Items</Text>
            <Text style={styles.statsNum}>40</Text>
          </View>
      </View>
      <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.followBtn}>
        <Text style={styles.btnText}>Follow</Text>
      </TouchableOpacity>
      </View>
    <View style={{ flex: 1, flexWrap: "nowrap"}}>
        <FlatList
        numColumns={2}
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
          
      />
    </View>
    <View style={styles.navbar}>
        <Navbar
          navigation={navigation}
        />
    </View>
  </SafeAreaView>
  );
}
