// view saved restaurant
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { RootStackParamList } from "src/types";

type Props = NativeStackScreenProps<RootStackParamList, "viewSavedRestaurants">;

export default function ViewSavedRestaurantsScreen({navigation}: Props) {
    return (
        <View>
            <Button 
            title="Go Back"
            onPress={ () => navigation.navigate('home')}
            />
        </View>
    )
}