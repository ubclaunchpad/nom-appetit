import React from 'react';
import { ButtonContainer, ButtonText} from "../styles/Shared";

interface Props {
  text: string;
  onPress: () => void;
  icon?: boolean;
}

export default function BasicButton({
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