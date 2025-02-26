import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import background from "../assets/background.png";
import CustomText from "../components/CustomText";
import logo from "../assets/images/things/pokeball.png";
import { updateStore, State, global } from "../context/GlobalStates";

const WinOrLoseScreen = () => {
  const store: State = global((state: any) => state);

  const recap = () => {
    updateStore((state: State) => {
      state.username = "";
      state.loggedIn = false;
      state.team = [];
      state.opponent_team = [];
      state.your_pokemon = null;
      state.opponent_pokemon = null;
      state.win = null;
    });
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.top}>
        <Image source={logo} />
        <CustomText styles={styles.headerText}>
          {store.win == true ? "You Win!" : "You Lose!"}
        </CustomText>
      </View>

      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => {
            recap();
          }}
          style={styles.button}
        >
          <CustomText styles={styles.buttonText}>Restart</CustomText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WinOrLoseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 10,
    padding: 20,
    backgroundColor: "#FFF",
  },
  top: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FFF",
  },
  main: {
    flex: 6,
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 16,
    color: "#FFF",
  },
  textInput: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eaeaea",
    padding: 5,
  },
  button: {
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#029cc6",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});
