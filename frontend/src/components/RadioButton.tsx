import { View } from "react-native";
import React from "react";

const RadioButton = ({ type, state }: any) => {
  if (
    state === "initialized" ||
    (state === "selected" && type === "no") ||
    (state === "unselected" && type === "yes")
  ) {
    return (
      <View
        style={{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#004643",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></View>
    );
  } else if (
    (state === "selected" && type === "yes") ||
    (state === "unselected" && type === "no")
  ) {
    return (
      <View
        style={{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#004643",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: "#004643",
          }}
        />
      </View>
    );
  }
};

export default RadioButton;
