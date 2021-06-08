import game from "./game";
import home from "./home";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getLevel = async () => {
  try {
    const level = await AsyncStorage.getItem("level");
    return Number(level);
  } catch (e) {}
};

const stores = {
  game,
  home,
  getLevel: async () => {
    const level = await getLevel();
    return level ? level : 1;
  },

  async setLevel(level) {
    await AsyncStorage.setItem("level", `${level}`);
  },
};

export default stores;
