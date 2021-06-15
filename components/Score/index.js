import React, { useState, useLayoutEffect } from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import styled from "styled-components/native";
import { IconButton } from "react-native-paper";
import RNModal from "react-native-modal";
import stores from "../../stores";

const DATA = [
  {
    id: "1",
    title: "LEVEL 1",
    time: "30",
  },
  {
    id: "2",
    title: "LEVEL 2",
    time: "232",
  },
  {
    id: "3",
    title: "LEVEL 3",
    time: "130",
  },
];
const ScoreItem = styled.TouchableOpacity`
  padding: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const TitleText = styled.Text`
  flex: 1;
`;
const TimeText = styled.Text`
  flex: 1;
  text-align: right;
`;
const RNModalView = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 3.84px;
  elevation: 5;
  padding-top: 10px;
`;
const RNModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
`;
const GameoverButtonWrap = styled.View`
  flex-direction: row;
`;

const RNModalNextButtonLeft = styled.TouchableOpacity`
  border-top-width: 1px;
  border-top-color: #ddd;
  border-right-width: 1px;
  border-right-color: #ddd;
  padding-vertical: 15px;
  flex: 1;
`;
const RNModalNextButtonRight = styled.TouchableOpacity`
  border-top-width: 1px;
  border-top-color: #ddd;
  border-right-color: #ddd;
  padding-vertical: 15px;
  flex: 1;
`;

const RNModalNextButtonText = styled.Text`
  color: #111;
  font-size: 18px;
  text-align: center;
`;

const renderItem = ({ item }) => {
  return (
    <ScoreItem>
      <TitleText>{item.title}</TitleText>
      <TimeText style={{ textAlign: "right" }}>{item.time}</TimeText>
    </ScoreItem>
  );
};

export const ScoreScreen = ({ navigation }) => {
  const [isResetVisible, setIsResetVisible] = useState(false);

  const doReset = async () => {
    await stores.game.setLevel(1);
    setIsResetVisible(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableHighlight>
            <IconButton
              icon="delete"
              size={24}
              color="#e67575"
              onPress={() => setIsResetVisible(true)}
            />
          </TouchableHighlight>
          <RNModal
            isVisible={isResetVisible}
            animationIn="zoomIn"
            animationOut="zoomOut"
          >
            <RNModalView>
              <RNModalTitle>Are you sure reset?</RNModalTitle>
              <GameoverButtonWrap>
                <RNModalNextButtonLeft onPress={() => setIsResetVisible(false)}>
                  <RNModalNextButtonText>No</RNModalNextButtonText>
                </RNModalNextButtonLeft>
                <RNModalNextButtonRight onPress={() => doReset()}>
                  <RNModalNextButtonText>Okay</RNModalNextButtonText>
                </RNModalNextButtonRight>
              </GameoverButtonWrap>
            </RNModalView>
          </RNModal>
        </View>
      ),
    });
  });
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
