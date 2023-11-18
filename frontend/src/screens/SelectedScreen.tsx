// selected restaurant page
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "selected">;

export default function SelectedScreen({navigation}: Props) {
    return (
        <View>
        </View>
    )
}