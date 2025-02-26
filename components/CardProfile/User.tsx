import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CardProps {
  name: string;
  status: string;
  ready: boolean;
  pokemonList: any[];
  onPress?: () => void;
}

const CardProfile = ({
  name,
  status,
  onPress,
  ready,
  pokemonList,
}: CardProps) => {
  let imageStyle = { width: 60 };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}
      style={[
        styles.container,
        {
          backgroundColor: ready ? "#7fe94fee" : "rgba(255, 255, 255, 0.8)",
        },
      ]}
    >
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.text}>{status}</Text>
      <Text style={styles.text}>{ready ? "Let's Go" : ""}</Text>
      <View style={styles.team}>
        {pokemonList.map((pokemon, index) => (
          <Image
            key={index}
            resizeMode={"contain"}
            style={imageStyle}
            source={pokemon.data.sprite}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  container: {
    height: 100,
    elevation: 5,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  team: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginLeft: 15,
    color: "#333",
  },
});
