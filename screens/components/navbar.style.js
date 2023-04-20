import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    navContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        height: '10%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }

});

export default styles;
