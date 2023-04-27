import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    navContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '20%',
        height: '100%',
        marginTop: 50,
        alignSelf: 'flex-end',
        zIndex: 10,
    },
    listingsContainer: {
        height: '40%',
        justifyContent: 'flex-end',
      
        alignItems: 'center'
    },
    buttonContainer: {
        justifyContent: 'space-around',
        height: '28%',
        marginTop: '20%'
      
    },

    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    
});

export default styles;
