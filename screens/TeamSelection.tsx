import { Audio } from "expo-av";
import React, { useEffect } from "react";
import { View, Button } from "react-native";
import CustomText from "../components/CustomText";
import { global, State } from "../context/GlobalStates";
import PokemonList from "../components/PokemonList/PokemonList";
import { TeamSelectionProps } from "../routes/app.routes";

const TeamSelectionScreen = ({ navigation }: TeamSelectionProps) => {
  const store: State = global((state: any) => state);

    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audios/select.mp3")
      );
      await sound.playAsync();
    }
  
    useEffect(() => {
      playSound();
    }, [])

  return (
    <View style={styles.container}>
      <CustomText styles={[styles.headerText]}>Select your team</CustomText>
      <PokemonList
        data={store.AllPokemons}
        numColumns={1}
        action_type={"select-pokemon"}
      />
      <Button
        title="LET'S GO"
        onPress={() => {
          navigation.navigate("Connect");
        }}
        disabled={store.player.team.length < 6}
      />
    </View>
  );
};

export default TeamSelectionScreen;

const styles = {
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    marginTop: 50,
    marginBottom: 10,
    alignSelf: "center",
  },
  confirmButton: {
    padding: 10,
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#95ff84",
  },
  loadingContainer: {
    alignItems: "center",
  },
  messageText: {
    fontSize: 13,
    color: "#676767",
  },
};
