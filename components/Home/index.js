import React from "react";
import { View, StatusBar, Text } from "react-native";
import styled from "styled-components/native";

const ContainerWrap = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 40px;
`;

const PlayButton = styled.TouchableOpacity`
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 20px 40px;
  margin: 80px auto;
  background: #4267b2;
`;

const TitleImage = styled.Image`
  width: 100%;
  margin-bottom: 50px;
`;

const Title = require("../../assets/title.png");
const Logo = require("../../assets/logo.png");
export const HomeScreen = ({ navigation: { navigate } }) => {
  return (
    <ContainerWrap source={Logo}>
      <StatusBar hidden={true} />
      <View
        style={{
          flex: 1,
          // flexDirection: "row",
          // flexWrap: "wrap",
        }}
      ></View>
      <View
        style={{
          flex: 3,
        }}
      >
        <TitleImage source={Title}></TitleImage>
        <PlayButton
          onPress={() =>
            navigate("Game", {
              headerTitle: "test",
            })
          }
        >
          <Text>PLAY</Text>
        </PlayButton>
      </View>
      <View
        style={{
          flex: 1,
          // flexDirection: "row",
          // flexWrap: "wrap",
        }}
      ></View>
    </ContainerWrap>
  );
};
