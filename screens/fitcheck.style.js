import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  fitcheckContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: 200,
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  captionContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  caption: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  listingImagecontainer: {
    flex: 1,
    margin: 5,
  },
  listingImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  listingTitleContainer: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  listingTitleText: {
    fontSize: 20,
    fontWeight: "400",
  },
  listingTitleTextLarge: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    fontWeight: "300",
  },
  preview: {
    width: "90%",
    height: "60%",
    left: "0%",
    top: "4%",
  },
  previewVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default styles;
