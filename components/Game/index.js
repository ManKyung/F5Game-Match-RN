import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyBackButton = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Back"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export const GameScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is Game!</Text>
      <MyBackButton />
    </View>
  );
};
