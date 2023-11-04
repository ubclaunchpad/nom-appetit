// home page
import React, { useEffect, useState } from "react";
import { Pressable, View, StyleSheet, Text, TextInput } from "react-native";

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
            <View style={{flexDirection: "row"}}>
                <Pressable style={style.button} onPress={ () => navigation.navigate('View')}>
                    <Text>
                        "Saved Restaurant"
                    </Text>
                </Pressable>
            
                
                <Pressable style={style.button} onPress={ () => navigation.navigate('Suggest')}>
                    <Text>
                        "Make a Suggestion"
                    </Text>
                </Pressable> 
            </View>
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
        fontSize: 20,
    },

    text_header2 : {
        color: '#FFFCF1',
        fontSize: 32,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10
    },

    button: {
        backgroundColor: "#F3CC91",
        color: "#004643",
        paddingHorizontal: 25,
        paddingVertical: 50,
        marginHorizontal: 5
    }
});