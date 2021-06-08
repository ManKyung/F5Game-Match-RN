import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  Vibration,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react";
import stores from "../../stores";
import RNModal from "react-native-modal";

import styled from "styled-components/native";
import BackImage from "../../assets/background.png";

const containerPadding = 10;
const tilePadding = 3;
const screen = Dimensions.get("screen");
const tileHeight = (screen.width - containerPadding * 2 - tilePadding * 2) / 4;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${containerPadding}px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const ContainerWrap = styled.ImageBackground`
  flex: 1;
  resize-mode: cover;
  justify-content: center;
`;

const Tile = styled.View`
  width: 25%;
  padding: ${tilePadding}px;
`;

const InnerTile = styled.TouchableOpacity`
  height: 100%;
  border-radius: 2px;
  width: 100%;
  border: 1px solid #aaa;
  background: #293244;
`;

const TileImage = styled.ImageBackground`
  flex: 1;
  background: #293244;
  opacity: 0;
`;

const RNModalView = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding-horizontal: 10px;
  padding-vertical: 14px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 3.84px;
  elevation: 5;
`;
const RNModalTitle = styled.Text`
  font-size: 36px;
  font-weight: bold;
`;

const RNModalAdmob = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-vertical: 10px;
`;

const RNModalNextButtonWrap = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const RNModalNextButton = styled.TouchableOpacity`
  background-color: #222f3e;
  padding-vertical: 6px;
  padding-horizontal: 10px;
  border-radius: 4px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.5px;
  padding: 10px;
  color: #fff;
`;
const RNModalNextButtonText = styled.Text`
  color: #aaa;
  font-size: 14px;
`;

const ClearModalView = styled.View`
  margin: 20px;
  background-color: white;
  padding: 35px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.25;
  elevation: 5;
  border-radius: 8px;
  color: #fff;
`;

export const GameScreen = observer(({ navigation }) => {
  const [rnmodalVisible, setRNModalVisible] = useState(false);

  const [isClick, setIsClick] = useState(false);
  const [counter, setCounter] = useState(30);
  const [isStart, setIsStart] = useState(true);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [gameLevel, setGameLevel] = useState(0);
  const [prevItems, setPrevNumber] = useState({
    key: null,
    number: null,
  });
  const { items } = stores.game;

  const setGameInit = () => {
    stores.game.setImageAndShuffle();
    setCounter(30);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>{counter}</Text>,
    });

    if (isStart) {
      setIsStart(false);
      setGameInit();

      async function getStorage() {
        const level = await stores.getLevel();
        setGameLevel(level);
        navigation.setOptions({ title: `LEVEL ${level}` });
      }
      getStorage();
    }

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    console.log(timer, counter);
    setCurrentTimer(timer);
    return () => clearInterval(timer);
  }, [navigation, counter, isStart]);

  useEffect(() => {}, []);

  const doSelect = async (key, item) => {
    if (isClick || item.active) {
      return;
    }
    if (prevItems.key === null) {
      setPrevNumber({
        key: key,
        number: item.number,
      });
      stores.game.setActive(key, true);
      return;
    }

    if (prevItems.number === item.number) {
      stores.game.setActive(key, true);
    } else {
      setIsClick(true);
      stores.game.setActive(key, true);
      // Vibration.vibrate();

      setTimeout(() => {
        stores.game.setActive(prevItems.key, false);
        stores.game.setActive(key, false);
        setIsClick(false);
      }, 600);
    }
    setPrevNumber({
      key: null,
      number: null,
    });

    if (stores.game.isClear()) {
      console.log("clear");
      const level = await stores.getLevel();
      stores.setLevel(level + 1);
      setRNModalVisible(true);

      console.log("count down release: ", currentTimer);
      clearInterval(currentTimer);

      // setGameInit();
    }
  };

  const doNext = () => {
    setRNModalVisible(false);
    console.log("count down release: ", currentTimer);
    clearInterval(currentTimer);
    setTimeout(() => {
      console.log("restart ready");
      setGameInit();
      setIsStart(true);
      console.log("restart play");
    }, 1000);
  };

  return (
    <ContainerWrap source={BackImage}>
      <Container>
        {items.map((item, key) => {
          return (
            <Tile style={{ height: tileHeight }} key={item.id}>
              <InnerTile onPress={() => doSelect(key, item)}>
                <TileImage
                  source={item.image}
                  style={item.active ? { opacity: 1 } : { opacity: 0 }}
                ></TileImage>
              </InnerTile>
            </Tile>
          );
        })}
      </Container>
      <RNModal
        isVisible={rnmodalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <RNModalView>
          <RNModalTitle>LEVEL {gameLevel} CLEAR</RNModalTitle>
          <RNModalAdmob>
            <Text>ADMOB</Text>
          </RNModalAdmob>
          <RNModalNextButtonWrap>
            <RNModalNextButton onPress={() => doNext()}>
              <RNModalNextButtonText>
                LEVEL {gameLevel + 1} START
              </RNModalNextButtonText>
            </RNModalNextButton>
          </RNModalNextButtonWrap>
        </RNModalView>
      </RNModal>
    </ContainerWrap>
  );
});
