import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../CustomText";

const HealthBar = ({ label, currentHealth, totalHealth }: any) => {
  let percent: any = (currentHealth / totalHealth) * 100;
  // let percent = currentHealth;
  let healthColor =
    percent <= 15
      ? "healthCritical"
      : percent <= 45
      ? "healthWarning"
      : "healthOK";

  let progressColor: any = styles[healthColor];

  return (
    <View>
      <CustomText styles={styles.label}>{label}</CustomText>
      <View style={styles.container}>
        <View style={styles.rail}>
          <View style={[styles.progress, progressColor, { width: percent }]} />
        </View>
        <View style={styles.percent}>
          <CustomText styles={styles.percentText}>
            {parseInt(percent)}%
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles: any = StyleSheet.create({
  container: {
    height: 10,
    width: 130,
    marginBottom: 15,
    flexDirection: "row",
  },
  label: {
    paddingBottom: 2,
    color: "#fff",
  },
  rail: {
    height: 10,
    width: 100,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#616161",
  },
  progress: {
    height: 8,
  },
  healthOK: {
    backgroundColor: "#5db56d",
  },
  healthWarning: {
    backgroundColor: "#fcc419",
  },
  healthCritical: {
    backgroundColor: "#fa5252",
  },
  percent: {
    paddingLeft: 3,
  },
  percentText: {
    fontSize: 10,
    color: "#fff",
  },
});

export default HealthBar;
