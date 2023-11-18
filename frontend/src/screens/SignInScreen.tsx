// signup page
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "signIn">;

export default function SignInScreen({navigation}: Props) {
    return (
        <View>
            <Button 
            text="Test Sign In"
            onPress={ () => navigation.navigate('home')}
            />
        </View>
    )
}

