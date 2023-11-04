import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { ButtonContainer, ButtonText} from "../styles/Shared";

export default function Button(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <ButtonContainer
      onPress={onPress}
    >
      <ButtonText>
        {title}
      </ButtonText>
    </ButtonContainer>
  );
}