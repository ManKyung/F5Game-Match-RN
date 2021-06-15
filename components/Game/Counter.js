import React from "react";
import styled from "styled-components/native";

const CouterText = styled.Text`
  padding-right: 10px;
  padding-top: 14px;
  font-size: 20px;
`;

export const Counter = ({ counter }) => {
  const convertTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(14, 5);
  };
  return (
    <>
      <CouterText>{convertTime(counter)}</CouterText>
    </>
  );
};
