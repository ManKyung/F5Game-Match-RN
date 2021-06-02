import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

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

const HomeScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <Button title="Go to Profile" onPress={() => navigate("Notifications")} />
    </View>
  );
};

const SettingsScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Text>Profile Screen</Text>
      <MyBackButton />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notifications" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
