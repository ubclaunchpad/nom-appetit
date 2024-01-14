// selected restaurant page
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "selectedRestaurant">;

export default function SelectedRestaurantScreen({navigation}: Props) {
    return (
        <View>
        </View>
    )
}