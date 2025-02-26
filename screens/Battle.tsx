import { ImageBackground } from "expo-image";
import { socket } from "../connection/socket";
import CustomText from "../components/CustomText";
import { BattleProps } from "../routes/app.routes";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MovesList from "../components/MoveList/MoveList";
import HealthBar from "../components/HeathBar/HealthBar";
import background from "../assets/backgrounds/teste1.gif";
import ActionList from "../components/ActionList/ActionList";
import PokemonList from "../components/PokemonList/PokemonList";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { global, updateStore, State, updateYourHeath } from "../context/GlobalStates";
import PokemonFullSprite from "../components/PokemonFullSprite/PokemonFullSprite";

const BattleScreen = ({ navigation }: BattleProps) => {
  const store: State = global((state: any) => state);
  const [isConnected, setIsConnected] = useState(false);


  useEffect(() => {
    updateStore((state: State) => {
      state.player.current_pokemon = state.player.team[0].data;
      state.opponent.current_pokemon = state.opponent.team[0].data;
    });
    
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    socket.on("connect", onConnect);

    socket.on("battleAction", (data) => {
      updateYourHeath(data.health, data.move, data.effectiveness);
    });

    socket.on("updateTurn", (data) => {
      updateStore((state: State) => {
        state.your_turn = data.myTurn;
      });
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("updateTurn");
    };
  }, []);

  useEffect(() => {
    if (store.win === true || store.win === false) {
      navigation.navigate("WinOrLose");
    }
  }, [store.win]);

  return (
    <ImageBackground
      source={background}
      contentFit="cover"
      contentPosition={{ top: 0, left: 0 }}
      style={styles.container}
    >
      <CustomText styles={[styles.headerText]}>Fight!</CustomText>

      <View style={styles.battleGround}>
        {store.opponent.current_pokemon && (
          <View style={styles.opponent}>
            <HealthBar
              currentHealth={store.opponent.current_pokemon.current_hp}
              totalHealth={store.opponent.current_pokemon.total_hp}
              label={store.opponent.current_pokemon.label}
            />
            <PokemonFullSprite
              pokemon={store.opponent.current_pokemon.label}
              spriteFront={store.opponent.current_pokemon.front}
              spriteBack={store.opponent.current_pokemon.back}
              size={store.opponent.current_pokemon.size}
              orientation={"front"}
            />
          </View>
        )}

        {store.player.current_pokemon && (
          <View style={styles.currentPlayer}>
            <HealthBar
              currentHealth={store.player.current_pokemon.current_hp}
              totalHealth={store.player.current_pokemon.total_hp}
              label={store.player.current_pokemon.label}
            />

            <PokemonFullSprite
              pokemon={store.player.current_pokemon.label}
              spriteFront={store.player.current_pokemon.front}
              spriteBack={store.player.current_pokemon.back}
              size={store.player.current_pokemon.size}
              orientation={"back"}
            />
          </View>
        )}
      </View>

      <CustomText styles={styles.turnText}>
        {store.your_turn ? "Your Turn" : "Opponent Turn"}
      </CustomText>

      <View style={styles.controls}>
        <View style={styles.controlsHeader}>
          {(store.player.move == "select-pokemon" ||
            store.player.move == "select-pokemon-move") &&
            store.player.move_display_text == null && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  updateStore((state: State) => {
                    state.player.move = "select-move";
                  });
                }}
              >
                <AntDesign name="arrowleft" size={24} color="#fefefe" />
              </TouchableOpacity>
            )}

          <CustomText styles={styles.controlsHeaderText}>
            {store.player.move_display_text}
          </CustomText>
        </View>

        {store.player.move == "select-move" &&
          store.player.move_display_text == null && <ActionList />}

        {store.player.move == "select-pokemon" && (
          <PokemonList
            data={store.player.team.map((item) => item.data)}
            scrollEnabled={false}
            numColumns={2}
            action_type={"switch-pokemon"}
          />
        )}

        {store.player.current_pokemon &&
          store.player.move == "select-pokemon-move" &&
          store.player.move_display_text == null && (
            <MovesList
              moves={store.player.current_pokemon.moves}
              opponent_pokemon={store.opponent.current_pokemon}
            />
          )}
      </View>
    </ImageBackground>
  );
};

export default BattleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  headerText: {
    fontSize: 20,
    marginTop: 50,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
  turnText: {
    fontSize: 20,
    color: "#ffffff",
    marginLeft: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
  battleGround: {
    flex: 8,
    padding: 12,
    flexDirection: "column",
  },
  currentPlayer: {
    alignSelf: "flex-start",
    alignItems: "center",
  },
  opponent: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  controls: {
    backgroundColor: "#ffffff42",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  controlsHeader: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginBottom: 10,
  },
  backButton: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  controlsHeaderText: {
    paddingTop: 5,
  },
  message: {
    fontSize: 15,
  },
});
