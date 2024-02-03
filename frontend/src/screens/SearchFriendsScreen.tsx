// home page
import React, { useEffect, useState } from "react";
import { Pressable, View, StyleSheet, Text, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types";

type Props = NativeStackScreenProps<RootStackParamList, "searchFriends">;

export default function SearchFriendsScreen({navigation}: Props) {
    return (
        <View style={style.container}>
            <Text>
                Search Friends Screen
            </Text>
        </View>
    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCE7C2',
    }

});