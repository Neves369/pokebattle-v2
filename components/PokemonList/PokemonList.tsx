import React from "react";
import { FlatList, StyleSheet } from "react-native";

import PokemonOption from "../PokemonOption/PokemonOption";
import { updateStore, State, global } from "../../context/GlobalStates";

interface PokemonListProps {
  data?: any[];
  numColumns?: number;
  scrollEnabled?: boolean;
  action_type?: string;
}

const PokemonList = ({
  data,
  numColumns,
  scrollEnabled,
  action_type,
}: PokemonListProps) => {
  const store: State = global((state: any) => state);

  const addPokemonToTeam = (pokemon: any) => {
    if (store.player.team.some((p) => p.index == pokemon.data.id)) {
      updateStore((state: State) => {
        state.player.team = state.player.team.filter(
          (p) => p.index != pokemon.data.id
        );
      });
    } else if (store.player.team.length < 6) {
      updateStore((state: State) => {
        state.player.team = [...state.player.team, pokemon];
      });
    }
  };

  return (
    <FlatList
      data={data}
      numColumns={numColumns}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
      renderItem={({ item }) => (
        <PokemonOption
          pokemon_data={item}
          is_selected={store.player.team.some((p) => p.index == item.id)}
          action_type={action_type}
          togglePokemon={(index, data) => {
            let new_item = { index, data };
            addPokemonToTeam(new_item);
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
});

export default PokemonList;
