import React from "react";
import { View, StatusBar, Text } from "react-native";
import styled from "styled-components/native";
import { Loader, Congratulation, Walk } from "../Animations";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
// import { Congratulation } from "../Animations/Congratulation";

const ContainerWrap = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 40px;
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
  margin-bottom: 50px;
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
        <Text>Brain Match</Text>
        <Loader />
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
        <TitleImage></TitleImage>
        <PlayButton onPress={() => navigate("Game")}>
          <PlayButtonText>PLAY</PlayButtonText>
        </PlayButton>
      </View>
    </ContainerWrap>
  );
};
