import React, { useState, useEffect, useLayoutEffect } from "react";
import { Counter } from "./Counter";
import { Option } from "./Option";
import { View, Text, Dimensions, Vibration } from "react-native";
import { observer } from "mobx-react";
import stores from "../../stores";
import RNModal from "react-native-modal";

import styled from "styled-components/native";
import BackImage from "../../assets/background.png";
import { Banner, Interstitial } from "../../lib";

const containerPadding = 10;
const tilePadding = 3;
const screen = Dimensions.get("screen");
// const tileHeight = (screen.width - containerPadding * 2 - tilePadding * 2) / 4;
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
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 3.84px;
  elevation: 5;
  padding-top: 10px;
`;
const RNModalTitle = styled.Text`
  font-size: 26px;
  font-weight: bold;
`;

const RNModalAdmob = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-vertical: 10px;
`;

const GameoverButtonWrap = styled.View`
  flex-direction: row;
`;

const GameClearButtonWrap = styled.View`
  flex-direction: row;
`;

const RNModalNextButton = styled.TouchableOpacity`
  background-color: #222f3e;
  padding-vertical: 15px;
  flex: 1;
`;

const RNModalNextButtonLeft = styled.TouchableOpacity`
  background-color: #222f3e;
  border-top-width: 1px;
  border-top-color: #383f48;
  border-right-width: 1px;
  border-right-color: #383f48;
  padding-vertical: 15px;
  flex: 1;
`;
const RNModalNextButtonRight = styled.TouchableOpacity`
  background-color: #222f3e;
  border-top-width: 1px;
  border-top-color: #383f48;
  padding-vertical: 15px;
  flex: 1;
`;

const RNModalNextButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

export const GameScreen = observer(({ navigation }) => {
  const [gameClearModalVisible, setGameClearModalVisible] = useState(false);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);

  const [isClick, setIsClick] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [counter, setCounter] = useState(5);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [gameLevel, setGameLevel] = useState(0);
  const [prevItems, setPrevNumber] = useState({
    key: null,
    number: null,
  });
  const { items } = stores.game;
  // console.log(stores.game.getStage());

  const column = items.length === 4 ? 2 : 4;
  const tileWidthPercent = items.length === 4 ? "50%" : "25%";
  const tileHeight =
    (screen.width - containerPadding * 2 - tilePadding * 2) / column;

  useEffect(() => {
    // console.log(123);
    // setTimeout(async () => {
    //   await Interstitial();
    // }, 2000);
  }, []);
  const setGameInit = () => {
    stores.game.setImageAndShuffle();
    setCounter(2000);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Counter counter={counter} />
          <Option navigation={navigation} />
        </View>
      ),
    });

    if (isStart) {
      setIsStart(false);
      setGameInit();
      async function getStorage() {
        const level = await stores.game.getLevel();
        setGameLevel(level);
        navigation.setOptions({
          title: `LEVEL ${level}`,
          // headerTintColor: "#293244",
        });
      }
      getStorage();

      setTimeout(() => {
        stores.game.setActiveClose();
      }, 3000);
    }

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    setCurrentTimer(timer);

    if (counter === 0) {
      doGameOver();
    }

    return () => clearInterval(timer);
    // }, [navigation, counter, isStart]);
  }, [navigation, counter]);

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

      if (stores.game.isVibration) {
        Vibration.vibrate();
      }

      setTimeout(() => {
        stores.game.setActive(prevItems.key, false);
        stores.game.setActive(key, false);
        setIsClick(false);
      }, 200);
    }
    setPrevNumber({
      key: null,
      number: null,
    });

    if (stores.game.isClear()) {
      console.log("clear");
      const level = await stores.game.getLevel();
      stores.game.setLevel(level + 1);
      setGameClearModalVisible(true);

      console.log("count down release: ", currentTimer);
      clearInterval(currentTimer);
    }
  };

  const doNext = () => {
    setGameInit();
    setGameClearModalVisible(false);
    // setTimeout(() => {
    console.log("restart ready");
    setIsStart(true);
    console.log("restart play");
    // }, 1000);
  };

  const doRestart = () => {
    setGameInit();
    setGameOverModalVisible(false);
    setIsStart(true);
  };

  const doGameOver = () => {
    setGameOverModalVisible(true);
  };

  return (
    <ContainerWrap source={BackImage}>
      <Container>
        {items.map((item, key) => {
          return (
            <Tile
              style={{ height: tileHeight, width: tileWidthPercent }}
              key={item.id}
            >
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
      <Banner />
      <RNModal
        isVisible={gameClearModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <RNModalView>
          <RNModalTitle>LEVEL {gameLevel} CLEAR</RNModalTitle>
          <RNModalAdmob>
            <Text>ADMOB</Text>
          </RNModalAdmob>
          <GameClearButtonWrap>
            <RNModalNextButton onPress={() => doNext()}>
              <RNModalNextButtonText>NEXT</RNModalNextButtonText>
            </RNModalNextButton>
          </GameClearButtonWrap>
        </RNModalView>
      </RNModal>

      <RNModal
        isVisible={gameOverModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <RNModalView>
          <RNModalTitle>Game Over</RNModalTitle>
          <Text>Would you like to try again?</Text>
          <RNModalAdmob>
            <Text>ADMOB</Text>
          </RNModalAdmob>
          <GameoverButtonWrap>
            <RNModalNextButtonLeft
              onPress={() => setGameOverModalVisible(false)}
            >
              <RNModalNextButtonText>No</RNModalNextButtonText>
            </RNModalNextButtonLeft>
            <RNModalNextButtonRight onPress={() => doRestart()}>
              <RNModalNextButtonText>Okay</RNModalNextButtonText>
            </RNModalNextButtonRight>
          </GameoverButtonWrap>
        </RNModalView>
      </RNModal>
    </ContainerWrap>
  );
});
