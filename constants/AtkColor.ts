export const backgroundColor = (move: any) => {
    if (move.type === "normal") {
      return "#A8A77A";
    } else if (move.type === "water") {
      return "#0000FF";
    } else if (move.type === "grass") {
      return "#00FF00";
    } else if (move.type === "fire") {
      return "#FF0000";
    } else if (move.type === "electric") {
      return "#e5c301";
    } else if (move.type === "dark") {
      return "#705746";
    } else if (move.type === "ice") {
      return "#98D8D8";
    } else if (move.type === "flying") {
      return "#A98FF3";
    } else if (move.type === "poison") {
      return "#A33EA1";
    } else if (move.type === "bug") {
      return "#A6B91A";
    } else if (move.type === "fighting") {
      return "#C22E28";
    } else if (move.type === "psychic") {
      return "#F95587";
    } else if (move.type === "ghost") {
      return "#735797";
    } else if(move.type === "rock") {
      return "#B6A136"; 
    } else if(move.type === "ground") {
      return "#E2BF65";
    }
};