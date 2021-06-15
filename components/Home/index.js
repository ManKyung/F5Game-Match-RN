import React from "react";
import { View, StatusBar } from "react-native";
import styled from "styled-components/native";
import { Walk } from "../Animations";
import TitlePng from "../../assets/title.png";
// import { Congratulation } from "../Animations/Congratulation";

const ContainerWrap = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 40px;
  background: #e1e2e3;
`;

const PlayButton = styled.TouchableOpacity`
  padding: 15px 25px;
  text-decoration: none;
  background-color: #4a63b4;
  border-radius: 15px;
  elevation: 35;
`;

const PlayButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: center;
`;

const TitleImage = styled.Image`
  width: 100%;
  margin-top: 70px;
`;

export const HomeScreen = ({ navigation: { navigate } }) => {
  return (
    <ContainerWrap>
      <StatusBar hidden={true} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <TitleImage source={TitlePng}></TitleImage>
      </View>

      <View
        style={{
          flex: 2,
        }}
      >
        <Walk />
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <PlayButton onPress={() => navigate("Game")}>
          <PlayButtonText>PLAY</PlayButtonText>
        </PlayButton>
      </View>
    </ContainerWrap>
  );
};
