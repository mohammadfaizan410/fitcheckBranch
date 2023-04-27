import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    homeContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    homeContent: {
            position: 'absolute',
            width: '100%',
            height: '90%',
        flexDirection: 'column',
        backgroundColor: 'white',
        display: 'flex',
    },
    homeFeed: {
        width: '100%',
        height: '100%',
        marginTop:40
    },
    navStyles: {
        zIndex: 100,
    }
   
});

export default styles;
