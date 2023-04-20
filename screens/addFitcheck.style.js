import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    marginTop: 0,
    alignItems: 'center',
    
    },
  preview: {
    width: '90%',
    height: '60%',
    left: '0%',
    top: '4%'

},
  previewVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

  },
  captionContainer: {
    position: 'absolute',
    height: '36%',
    width: '100%',
    top: '64%',
    backgroundColor: 'white',
    padding: 20
  },
  input: {
    width: '100%',
    height: '30%',
    borderColor: 'rgb(240, 241, 242)',
    borderWidth: 2,
    textAlignVertical: 'top',
    paddingLeft: 10,
    paddingTop: 7
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
   justifyContent: 'space-between',
   marginTop: 20
  },
  button: {
        padding: 20,
        borderRadius: 20,
        color: "#ffffff",
        backgroundColor: "#5E2BAA",
        width: '40%',
        textAlign: 'center',
        marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: 'center',
    zIndex: 0
   }
  
});

export default styles;
