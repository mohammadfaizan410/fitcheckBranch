import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    marginTop: 0
    },
    camera: {
        position: 'absolute',
        width: '100%',
        height: '100%'

    },
  toggleButton: {
    padding: 20,
    borderRadius: 20,
    color: "#ffffff",
    backgroundColor: "#5E2BAA",
    width: '22%',
    textAlign: 'center',
    marginBottom: 10,
    position: 'absolute',
      top: '92%',
      left: '60%'
    },
    takeButton: {
        padding: 20,
        borderRadius: 20,
        color: "#ffffff",
        backgroundColor: "#5E2BAA",
        width: '22%',
        textAlign: 'center',
        marginBottom: 10,
        position: 'absolute',
          top: '92%',
          left: '30%'
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign:'center'
    },
    image: {
        position: 'absolute',
        width: 500,
        height: 500
  }
});

export default styles;
