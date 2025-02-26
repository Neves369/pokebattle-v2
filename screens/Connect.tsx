import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { socket } from "../connection/socket";
import background from "../assets/background.png";
import { ConnectProps } from "../routes/app.routes";
import CardProfile from "../components/CardProfile/User";
import { State, global, updateStore } from "../context/GlobalStates";

export default function ConnectScreen({ navigation }: ConnectProps) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const store: State = global((state: any) => state);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    socket.on("connect", onConnect);

    socket.on("startBattle", (data) => {
      setLoading(false);
      updateStore((state: State) => {
        state.battleId = data.battleId;
        state.opponent = data.opponent;
        state.your_turn = data.myTurn;
      });
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("startBattle");
    };
  }, []);

  useEffect(() => {
    if (loading == false && ready == true) {
      setTimeout(() => {
        navigation.navigate("Battle");
      }, 2000);
    }
  }, [loading]);

  function sendMessage() {
    let message = store.player;
    socket.emit("ready", message);
    setReady(true);
  }

  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Conectando</Text>
      </View>

      <View style={styles.main}>
     
          <CardProfile
            pokemonList={store.player.team}
            onPress={sendMessage}
            name={store.player.username}
            ready={ready}
            status={isConnected ? "connected" : "disconnected"}
          />
        

        {isConnected && store.opponent.username !== "" && (
          <CardProfile
            pokemonList={store.opponent.team}
            name={store.opponent.username}
            ready={true}
            status={isConnected ? "connected" : "disconnected"}
          />
        )}

        {loading && (
          <Text style={styles.subtitle}>Aguardando outro jogador...</Text>
        )}
      </View>
    </ImageBackground>
  );
}

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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FFF",
  },
  main: {
    flex: 6,
    gap: 20,
    justifyContent: "flex-start",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFF",
    textAlign: "center",
  },
  textarea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  scroll: {
    maxHeight: 100,
    marginBottom: 20,
  },
  messages: {
    maxHeight: 200,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
});
