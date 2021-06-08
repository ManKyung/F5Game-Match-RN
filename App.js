import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./components/Home";
import { GameScreen } from "./components/Game";
import { ModalTester } from "./components/Modal";
import { Time } from "./components/Game/Time";
import { Button } from "react-native";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="Modal"
          component={ModalTester}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen title="LEVEL" name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
