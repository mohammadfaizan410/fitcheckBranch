import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    homeContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    
    },
    homeContent: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    homeFeed: {
        width: '100%',
        height: '95%',
    },
    navStyles: {
        zIndex: 100,
    }
   
});

export default styles;
