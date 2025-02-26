import React from "react";
import CustomText from "../CustomText";
import { Entypo } from "@expo/vector-icons";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { State, updateStore, global } from "../../context/GlobalStates";

interface PokemonOptionProps {
  pokemon_data?: any;
  is_selected?: boolean;
  action_type?: string;
  togglePokemon: (id: number, pokemon_data: any) => void;
  setPokemon: (pokemon: any) => void;
  backToMove: () => void;
}

const PokemonOption = ({
  pokemon_data,
  is_selected = false,
  action_type,
  togglePokemon,
}: PokemonOptionProps) => {
  let compact = action_type == "select-pokemon" ? false : true;
  let marginTop = compact ? {} : { marginTop: 20 };
  let imageStyle = compact ? { width: 40 } : { width: 60 };

  const { id, label, sprite } = pokemon_data;
  const store: State = global((state: any) => state);

  return (
    <TouchableOpacity
      disabled={store.your_turn == false}
      onPress={() => {
        if (action_type == "select-pokemon") {
          togglePokemon(id, pokemon_data);
        } else if (action_type == "switch-pokemon") {
          updateStore((state: State) => {
            state.your_turn = false;
            state.player.current_pokemon = pokemon_data;
            state.player.move = "select-move";
          });
        }
      }}
    >
      <View style={[styles.container, marginTop]}>
        <Image source={sprite} resizeMode={"contain"} style={imageStyle} />
        <CustomText styles={[styles.text]}>{label}</CustomText>
        <Entypo
          name="check"
          size={18}
          color={is_selected ? "#40c057" : "#FFF"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
  },
  text: {
    width: 100,
  },
});

export default PokemonOption;
