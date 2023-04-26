import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    width: "45%",
    backgroundColor: "grey",
    marginBottom: 10,
    marginLeft: 10,
    height: 150,
    marginRight: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  navbar: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  titleContainer: {
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    color: "grey",
    fontWeight: 400,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  imageName: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImg: {
    marginTop: 15,
    marginBottom: 15,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    color: "grey",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginLeft: "7%",
    marginRight: "7%",
  },
  profileStats: {
    display: "flex",
    flexDirection: "column",
    borderRightColor: "grey",
    borderRightWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  statsTitle: {
    color: "grey",
    fontSize: 15,
    marginBottom: 7,
  },
  statsNum: {
    color: "#5E2BAA",
    fontSize: 17,
    fontWeight: "",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  followBtn: {
    padding: 8,
    borderRadius: 40,
    color: "#ffffff",
    width: "30%",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    borderColor: "#5E2BAA",
    borderWidth: 2,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    color: "#5E2BAA",
  },
  profileOptions: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: "90%",
    alignSelf: 'flex-end',
    marginRight: '5%'
  },
  profileOptionBtn: {
    display: "flex",
    textAlign: "center",
    borderColor: "#5E2BAA",
    borderWidth: 1,
    padding: 10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius: 20
  },
  listOptions: {
    display: "flex",
    flexDirection: 'row',
    marginTop: 20,
  },
  listOptionsBtn: {
    display: "flex",
    textAlign: "center",
    width: '50%',
    textAlign: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    padding : 10
  }
});

export default styles;
