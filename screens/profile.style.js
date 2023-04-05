import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },

  columnContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    textTransform: "capitalize",
  },

  button: {
    padding: 10,
    borderRadius: 5,
    color: "#ffffff",
    backgroundColor: "rgb(62,0,153)",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
  },

  input: {
    fontSize: 18,
    //width: "100%",
    borderColor: "rgb(176,176,176)",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  postContainer: {},
  postImage: {},
});

export default styles;
