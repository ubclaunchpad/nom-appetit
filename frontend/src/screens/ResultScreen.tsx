// search result
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "result">;

export default function ResultScreen({navigation}: Props) {
    return (
        <View>
            <Button 
            title="Go Back"
            onPress={ () => navigation.navigate('search')}
            />
        </View>
    )
}