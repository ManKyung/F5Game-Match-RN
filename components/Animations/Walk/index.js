import React from "react";
import LottieView from "lottie-react-native";

export const Walk = () => {
  return <LottieView source={require("./walk.json")} autoPlay loop />;
};
