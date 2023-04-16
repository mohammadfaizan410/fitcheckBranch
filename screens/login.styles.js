import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: '100%',
        height:'100%',
        marginTop: 0
      },    

    backGroundImage: {
        width: '100%',
        height: '100%'
    },
    screenTitle: {
        // fontFamily: "Neurial Grotesk",
        position: 'absolute',
        top: '15%',
        fontSize: 32
    },
    logoContainer: {
        position: 'absolute',
        top: "20%",
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        height: 100,
        width: 200,
        resizeMode: 'contain'
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginTop: 20
    },
    loginInput: {
        width: '100%',
        marginLeft: 10
    },
    button: {
        padding: 20,
        borderRadius: 20,
        color: "#ffffff",
        backgroundColor: "#5E2BAA",
        width: '72%',
        textAlign: 'center',
        marginBottom: 10,
        zIndex: 100
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
        zIndex: 0
      },

})


export default styles;