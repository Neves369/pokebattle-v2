import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { ImageBackground } from "expo-image";
import background from "../assets/background.gif";
import CustomText from "../components/CustomText";
import React, { useEffect, useState } from "react";
import logo from "../assets/images/things/pokeball.png";
import { updateStore, State } from "../context/GlobalStates";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const login = () => {
    updateStore((state: State) => {
      state.player.username = username;
      state.loggedIn = true;
    });
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audios/menu.mp3")
    );
    setSound(sound);
    await sound.playAsync();
    await sound.setIsLoopingAsync(true);
  }

  useEffect(() => {
    playSound();
  }, [])
  

  return (
    <ImageBackground source={background} contentPosition={"right"} style={styles.container}>
      <View style={styles.top}>
        <Image source={logo} />
        <CustomText styles={styles.headerText}>Pokémon Battles</CustomText>
      </View>

      <View style={styles.main}>
        <CustomText styles={styles.label}>Enter username</CustomText>
        <TextInput
          style={styles.textInput}
          onChangeText={(username) => setUsername(username)}
          value={username}
        />

        <TouchableOpacity
          onPress={() => {
            login();
            if (sound) {
              sound.pauseAsync();
            }
          }}
          style={styles.button}
        >
          <CustomText styles={styles.buttonText}>Sign in</CustomText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

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
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});
