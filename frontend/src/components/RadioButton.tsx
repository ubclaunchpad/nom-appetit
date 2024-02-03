import React from 'react';
import { RadioButtonContainer, RadioButtonSelection} from "../styles/Shared";

interface Props {
  onPress: () => void;
  icon?: boolean;
}

export default function RadioButton({
  onPress,
}: Props): JSX.Element {
  return (
    <RadioButtonContainer
      onPress={onPress}
    >
    </RadioButtonContainer>
  );
}