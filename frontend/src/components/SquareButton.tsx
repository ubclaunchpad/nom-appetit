import React from 'react';
import { Image } from 'react-native';
import { ButtonText, SquareButtonContainer} from "../styles/Shared";

interface Props {
  text: string;
  onPress: () => void;
  icon: string;
}

export default function SquareButton({
  text,
  onPress,
  icon
}: Props): JSX.Element {

    const iconString = icon

    const imageUrl = require(icon);

  return (
    <SquareButtonContainer
      onPress={onPress}
    >
      <ButtonText>
        {text}
      </ButtonText>
      <Image source={imageUrl}/>
    </SquareButtonContainer>
  );
}