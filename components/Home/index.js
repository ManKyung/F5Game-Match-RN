import React from "react";
import { Button, Text, View } from "react-native";

export const HomeScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Homasdfe Tttest!</Text>
      <Button title="Go Screen" onPress={() => navigate("Game")} />
    </View>
  );
};
