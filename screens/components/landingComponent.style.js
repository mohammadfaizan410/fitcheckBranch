import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%',
    height:'100%',
    marginTop: 0
  },

  subcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: 200,
    marginBottom: 10,
    marginTop: 10,
  },

  loginTop: {
    width: '100%',
    height: '60%',
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "black",
    margin: "auto",
    marginTop: 0,
    marginBottom: 0,
  },

  titleView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '-40%',
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    position: "absolute",
    top: '10%',
    left: '3%'
  },

  logo: {
    height: 75,
    width: 150,
    resizeMode: 'contain',
    marginLeft: 15
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    alignSelf: "flex-start",
  },

  button: {
    padding: 20,
    borderRadius: 20,
    color: "#ffffff",
    backgroundColor: "#5E2BAA",
    width: '72%',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign:'center'
  },

  input: {
    fontSize: 18,
    width: "100%",
    borderColor: "rgb(176,176,176)",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
});

export default styles;
