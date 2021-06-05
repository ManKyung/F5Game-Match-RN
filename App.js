import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./components/Home";
import { GameScreen } from "./components/Game";

const Stack = createStackNavigator();

const App = () => {
  return (
    // <Provider {...root}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
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
    // </Provider>
  );
};

export default App;
