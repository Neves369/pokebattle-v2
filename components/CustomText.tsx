import React from "react";
import { Text } from "react-native";

const CustomText = ({ children, styles }: any) => {
  return <Text style={[{ fontFamily: "Aldrich" }, styles]}>{children}</Text>;
};

export default CustomText;
