// search restaurant
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "search">;

export default function SearchScreen({navigation}: Props) {
    return (
        <View>
            <Button 
            title="Execute Search"
            onPress={ () => navigation.navigate('result')}
            />
        </View>
    )
}