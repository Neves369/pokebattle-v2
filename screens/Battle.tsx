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
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
} from "react-native";
import {
  global,
  State,
  updateStore,
  updateYourHeath,
} from "../context/GlobalStates";

import PokemonFullSprite from "../components/PokemonFullSprite/PokemonFullSprite";

const BattleScreen = ({ navigation }: BattleProps) => {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const store: State = global((state: any) => state);
  const [opacity] = useState(new Animated.Value(0));
  const [isConnected, setIsConnected] = useState(false);
  const [offset] = useState(new Animated.ValueXY({ x: -100, y: 100 }));
  const [offset2] = useState(new Animated.ValueXY({ x: 100, y: -100 }));

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

    executeAnimations();

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

  const executeAnimations = () => {
    Animated.parallel([
      Animated.spring(offset.x, {
        toValue: 0,
        speed: 0.5,
        bounciness: 2,
        useNativeDriver: false,
      }),
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 1,
        bounciness: 2,
        useNativeDriver: false,
      }),
      Animated.spring(offset2.x, {
        toValue: -50,
        speed: 0.5,
        bounciness: 2,
        useNativeDriver: false,
      }),
      Animated.spring(offset2.y, {
        toValue: 0,
        speed: 1,
        bounciness: 0,
        useNativeDriver: false,
      }),
    ]).start();

    setVisible(true);
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 1000);

    setTimeout(() => {
      setReady(true);
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      setVisible(false);
    }, 2000);
  };

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
            {ready == true ? (
              <>
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
              </>
            ) : (
              <Animated.Image
                style={[
                  styles.pokeball,
                  {
                    transform: [
                      { translateY: offset2.y },
                      { translateX: offset2.x },
                    ],
                  },
                ]}
                source={require("../assets/sprites/pokeball-front.png")}
              />
            )}
          </View>
        )}

        {store.player.current_pokemon && (
          <View style={styles.currentPlayer}>
            {ready == true ? (
              <>
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
              </>
            ) : (
              <Animated.Image
                style={[
                  styles.pokeball,
                  {
                    marginLeft: 50,
                    transform: [
                      { translateY: offset.y },
                      { translateX: offset.x },
                    ],
                  },
                ]}
                source={require("../assets/sprites/pokeball-back.png")}
              />
            )}
          </View>
        )}
      </View>

      <View style={styles.footer}>
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
      </View>

      <View style={styles.ghostfooter} />

      <Modal animationType="fade" transparent={true} visible={visible}>
        <Animated.View
          style={[
            styles.flash,
            {
              opacity: opacity,
            },
          ]}
        />
      </Modal>
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
    display: "flex",
    flexDirection: "column",
  },
  currentPlayer: {
    flex: 1,
    paddingLeft: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  opponent: {
    flex: 1,
    paddingRight: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  controls: {
    bottom: 0,
    left: 0,
    right: 0,
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
  pokeball: {
    width: 50,
    height: 50,
    position: "absolute",
  },
  flash: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  ghostfooter: {
    height: 250,
    backgroundColor: "transparent",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
