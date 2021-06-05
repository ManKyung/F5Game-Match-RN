import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Vibration } from "react-native";
import { observer } from "mobx-react";
import stores from "../../stores";
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

stores.game.setImageAndShuffle();

export const GameScreen = observer(() => {
  const [isClick, setIsClick] = useState(false);
  const [prevItems, setPrevNumber] = useState({
    key: null,
    number: null,
  });
  const { items } = stores.game;

  const doSelect = (key, item) => {
    if (isClick) {
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
      }, 800);
    }
    setPrevNumber({
      key: null,
      number: null,
    });

    if (stores.game.isClear()) {
      console.log("clear");
    }
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
    </ContainerWrap>
    //
    //   <Container>
    //     {items.map((item, key) => {
    //       return (
    //         <Tile
    //           style={{ height: tileHeight }}
    //           key={item.id}
    //           onLayout={key === 0 ? (e) => onLayout(e) : null}
    //         >
    //           <InnerTile onPress={() => doSelect(key, item)}>
    //             <TileImage
    //               source={item.image}
    //               style={!item.active ? { opacity: 1 } : { opacity: 0 }}
    //             ></TileImage>
    //           </InnerTile>
    //         </Tile>
    //       );
    //     })}
    //   </Container>
    // </ContainerWrap>
  );
});
