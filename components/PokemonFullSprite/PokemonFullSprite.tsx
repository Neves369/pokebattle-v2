import React from "react";
import { Image } from "expo-image";

const PokemonFullSprite = ({
  spriteFront,
  spriteBack,
  orientation,
  size,
}: any) => {
  let sprite = orientation == "front" ? spriteFront : spriteBack;
  return (
    <Image
      source={sprite}
      contentFit={"contain"}
      style={
        size == "large"
          ? styles.image_large
          : size == "medium"
          ? styles.image_medium
          : styles.image_small
      }
    />
  );
};

const styles = {
  container: {
    paddingBottom: 20,
  },
  image_small: {
    width: 80,
    height: 80,
  },
  image_medium: {
    width: 150,
    height: 150,
  },
  image_large: {
    width: 200,
    height: 200,
  },
};

export default PokemonFullSprite;
