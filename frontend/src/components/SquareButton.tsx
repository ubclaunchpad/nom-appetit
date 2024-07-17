import React from "react";
import { Image } from "react-native";
import { ButtonText, SquareButtonContainer } from "../styles/Shared";
import Images from "../images/Images";

interface Props {
  text: string;
  onPress: () => void;
  icon: any;
}

export default function SquareButton({
  text,
  onPress,
  icon,
}: Props): JSX.Element {
  return (
    <SquareButtonContainer onPress={onPress}>
      <ButtonText>{text}</ButtonText>
      <Image source={icon} />
    </SquareButtonContainer>
  );
}
