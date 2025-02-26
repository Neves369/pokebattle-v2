import React from "react";
import CustomText from "../CustomText";
import moves_data from "../../data/moves_data";
import { socket } from "../../connection/socket";
import { backgroundColor } from "../../constants/AtkColor";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { global, State, updateOpponentHeath } from "../../context/GlobalStates";
import getMoveEffectivenessAndDamage from "../../helpers/getMoveEffectivenessAndDamage";

const MoveList = ({ moves, opponent_pokemon }: any) => {
  const store: State = global((state: any) => state);

  const handleAtack = (move: any) => {
    try {
      let { damage, effectiveness } = getMoveEffectivenessAndDamage(
        move,
        opponent_pokemon
      );
      let health = opponent_pokemon.current_hp - damage;
      socket.emit("battleAction", {
        battleId: store.battleId, 
        action: {
          move: move.title,
          damage,
          health,
          effectiveness,
        },
      });
      updateOpponentHeath(health, move.title, effectiveness);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FlatList
      data={moves}
      numColumns={2}
      scrollEnabled={false}
      keyExtractor={(item, index) => item}
      renderItem={({ item }) => {
        const move = moves_data.find((move: any) => move.id === item);
        return (
          <TouchableOpacity
            disabled={!store.your_turn}
            style={[
              styles.container,
              {
                backgroundColor: store.your_turn
                  ? backgroundColor(move)
                  : "#bfc7c7",
              },
            ]}
            onPress={() => {
              handleAtack(move);
            }}
          >
            <CustomText styles={styles.label}>{move.title}</CustomText>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    padding: 5,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#06BCEE",
  },
  label: {
    fontSize: 14,
    color: "#fff",
  },
});

export default MoveList;
