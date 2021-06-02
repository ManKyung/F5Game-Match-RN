import React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { HomeScreen } from "./components/Home";
import { GameScreen } from "./components/Game";

const Stack = createStackNavigator();

const MyBackButton = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Backaa"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: "test",
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="dfdf"
                color="#ddd"
              />
            ),
          }}
        />
        <Stack.Screen
          options={{
            headerTitle: "Game Level",
          }}
          name="Game"
          component={GameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
