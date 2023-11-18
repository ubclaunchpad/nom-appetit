import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { ButtonContainer, ButtonText} from "../styles/Shared";

interface Props {
  text: string;
  onPress: () => void;
  icon?: boolean;
}

export default function Button({
  text,
  onPress,
}: Props): JSX.Element {
  return (
    <ButtonContainer
      onPress={onPress}
    >
      <ButtonText>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
}