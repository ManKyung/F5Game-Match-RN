import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Cat } from "../Animations";
import GradientButton from "react-native-gradient-buttons";

export const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.view}>
        <Cat />
      </View>
      <View style={styles.view}>
        <GradientButton
          text="PLAY"
          width="70%"
          deepBlue
          onPressAction={() => navigation.push("Game")}
        />
        <StatusBar hidden={true} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222B45",
  },
});
