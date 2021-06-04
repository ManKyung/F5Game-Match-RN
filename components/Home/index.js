import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { observer, inject } from "mobx-react";
export const a = inject("store")(observer(({ store }) => {}));
// export const HomeScreen = ({ navigation: { navigate } }) => {
export const HomeScreen = ({ navigation: { navigate } }) => {
  const widthStyle = "box3";

  const ref = useRef();

  const [count, setCount] = useState(0);
  let height = 0;
  useEffect(() => {
    height = ref.current.clientWidth;
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <View
        ref={ref}
        style={[styles[widthStyle], { backgroundColor: "powderblue" }]}
      />
      <Text>13423</Text>
      <View
        style={[
          styles[widthStyle],
          { height: height, backgroundColor: "skyblue" },
        ]}
      />
      <View style={[styles[widthStyle], { backgroundColor: "steelblue" }]} />
      <View style={[styles[widthStyle], { backgroundColor: "tomato" }]} />
      <View style={[styles[widthStyle], { backgroundColor: "red" }]} />
      <View style={[styles[widthStyle], { backgroundColor: "blue" }]} />
      <View style={[styles[widthStyle], { backgroundColor: "green" }]} />
      <View style={[styles[widthStyle], { backgroundColor: "black" }]} />

      {/* <Text>Homasdfe Tttest!</Text>
      <Button title="Go Screen" onPress={() => navigate("Game")} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  box1: { width: "33%" },
  box2: { width: "25%" },
  box3: { width: "20%" },
});

// export default inject("store")(observer(HomeScreen));
// export default HomeScreen;
