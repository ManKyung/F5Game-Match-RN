import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Cat } from "../Animations";
import GradientButton from "react-native-gradient-buttons";
import styled from "styled-components/native";
import { Banner } from "../../lib";

const RNModalAdmob = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: -40px;
  margin-bottom: 40px;
`;

export const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.view}>
        <Cat />
      </View>
      <View style={styles.view}>
        <RNModalAdmob>
          <Banner bannerSize="mediumRectangle" />
        </RNModalAdmob>
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
