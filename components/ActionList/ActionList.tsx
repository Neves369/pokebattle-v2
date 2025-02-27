import React from "react";
import CustomText from "../CustomText";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { global, State, updateStore } from "../../context/GlobalStates";

const ActionList = () => {
  const store: State = global((state: any) => state);

  const data = [
    {
      label: "Fight",
      action: () => {
        updateStore((state: State) => {
          state.player.move = "select-pokemon-move";
        });
      },
    },
    {
      label: "Switch",
      action: () => {
        updateStore((state: State) => {
          state.player.move = "select-pokemon";
        });
      },
    },
    {
      label: "None",
      action: () => {
        // updateStore((state: State) => {
        //   state.player.move = "select-move";
        //   state.your_turn = !store.your_turn;
        // });
      },
    },
    {
      label: "Surrender",
      action: () => {
        updateStore((state: State) => {
          state.win = false;
        });
      },
    },
  ];

  return (
    <FlatList
      data={data}
      numColumns={2}
      scrollEnabled={false}
      keyExtractor={(item, index) => `${item.label}${index}`}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.container} onPress={item.action}>
          <CustomText styles={styles.label}>{item.label}</CustomText>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: 150,
    backgroundColor: "#06BCEE",
  },
  label: {
    fontSize: 20,
    color: "#fff",
  },
});

export default ActionList;
