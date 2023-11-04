import styled from "styled-components/native";
import { Dimensions } from "react-native";
// import { MotiView } from "moti";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const ButtonContainer = styled.TouchableOpacity`
    margin-vertical: 40px;
    width: 120px;
    height: 40px;
    padding: 12px;
    border-radius: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;