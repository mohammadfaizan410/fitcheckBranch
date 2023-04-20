import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    marginTop: 0,
     backgroundColor: 'black'
    },
    camera: {
        position: 'absolute',
        width: '100%',
      height: '70%',
        top: '15%'

    },
  navContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    top: '87%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20
},
innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  preview: {
    position: 'absolute',
    width: '100%',
  height: '70%',
    top: '15%'

},
});

export default styles;
