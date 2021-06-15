import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./components/Home";
import { GameScreen } from "./components/Game";
import { ScoreScreen } from "./components/Score";

// Set global test device ID
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen title="LEVEL" name="Game" component={GameScreen} />
        <Stack.Screen title="SCORE" name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
