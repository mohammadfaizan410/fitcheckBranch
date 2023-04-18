import { color } from "@rneui/base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%',
    height:'100%',
    marginTop: 0
  },

  logoContainer: {
    position: "absolute",
    top: '5%',
    left: '3%'
  },
  shopTitleContainer: {
    position: 'absolute',
    top: '15%',
  },

  shopTitle: {
    position: 'absolute',
    top: '18%',
    left: '8%',
    width: '50%',
    fontSize: 36,
    textAlign: "left",
    color: "#5E2BAA",
    fontWeight: 'bold'
  },

  logo: {
    height: 75,
    width: 150,
    resizeMode: 'contain',
    marginLeft: 15
  },

  formTitle: {
    width: '100%',
    fontSize: 30,
    textAlign:'left'
},
formContainer: {
    position: 'absolute',
    top: '35%',
    width: '90%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center'
},
formSection: {
    width: '90%',
    flexDirection: 'row',
    paddingBottom: 10,
    marginTop: 20
},
shopInput: {
    width: '100%',
  borderColor: 'black',
  borderWidth: 1,
  borderRadius: 25,
  padding: 10
},
button: {
    padding: 20,
    borderRadius: 20,
    color: "#ffffff",
    backgroundColor: "#5E2BAA",
    width: '72%',
    textAlign: 'center',
    marginBottom: 20,
    zIndex: 100
},
buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: 'center',
    zIndex: 0
  },
});

export default styles;
