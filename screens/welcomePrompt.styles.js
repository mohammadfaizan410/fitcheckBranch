import { color } from "@rneui/base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%',
    height:'100%',
    marginTop: 0,
    backgroundColor: "#CCFF66"
  },

  logoContainer: {
    position: "absolute",
    top: '5%',
    left: '3%'
    },
  
  promptTitle: {
    position: 'absolute',
    top: '35%',
    width: '75%',
    fontSize: 36,
    color: "#5E2BAA",
    fontWeight: 'bold',
    lineHeight: 45
  },

  logo: {
    height: 75,
    width: 150,
    resizeMode: 'contain',
    marginLeft: 15
  }
});

export default styles;
