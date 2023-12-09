// signup page
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import BasicButton from "../components/BasicButton";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container } from "../styles/Shared";

type Props = NativeStackScreenProps<RootStackParamList, "signIn">;

export default function SignInScreen({navigation}: Props) {
    return (
        <Container>
            <BasicButton 
            text="Test Sign In"
            onPress={ () => navigation.navigate('home')}
            />
        </Container>
    )
}

