import styled from "styled-components/native";
import { Dimensions } from "react-native";
// import { MotiView } from "moti";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const ButtonContainer = styled.TouchableOpacity<{
    icon?: boolean;
}>`
    display: flex;
    border-radius: 50px;
    background: #F3CC91;
    shadowOffset: 7px 7px;
    shadowColor: rgba(67, 101, 91, 0.10);
    shadowOpacity: 1.0;
    padding: 8px 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 136px;
`;

export const ButtonText = styled.Text`
    color: #004643;
    text-align: center;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
`;

export const Container = styled.View`
    display: flex;
    align-items: center;
`;