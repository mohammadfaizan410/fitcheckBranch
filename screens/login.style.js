import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:'auto'
  },

  subcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 200,
    marginBottom: 10,
    marginTop: 10
  },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20
    },

    subtitle: {
    fontSize: 18,
    alignSelf: 'flex-start'
    },

    button: {
        padding: 10,
        borderRadius: 5,
        color: '#ffffff',
        backgroundColor: 'rgb(62,0,153)',
        width: '100%',
        marginBottom: 10,
        marginTop: 10
    },
    buttonText: {
      color: 'white',
      alignSelf:'center'
  },

    input: {
      fontSize: 18,
      width: '100%',
      borderColor: 'rgb(176,176,176)',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      marginBottom: 5
      
    }
  });
  
  export default styles;