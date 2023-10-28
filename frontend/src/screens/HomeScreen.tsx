// home page
import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, Text, TextInput } from "react-native";

export default function HomeScreen({navigation}) {
    return (
        <View style={style.container}>
            <Text
            style={{fontSize: 40, textAlign: 'center'}}>
                What would you like to eat?
            </Text>

            <TextInput
                style={style.input}
                placeholder="Search for a restaurant"
            />

            <Button 
            title="View Saved Places"
            onPress={ () => navigation.navigate('View')}
            />
            <Button 
            title="Suggest a New Place"
            onPress={ () => navigation.navigate('Suggest')}
            />
        </View>
    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCE7C2',
    },

    text_header1 : {
        color: '#FFFCF1',
        fontSize: 16,
    },

    text_header2 : {
        color: '#FFFCF1',
        fontSize: 32,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5
    }
});