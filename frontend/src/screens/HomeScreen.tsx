// home page
import React, { useEffect, useState } from "react";
import { Pressable, View, StyleSheet, Text, TextInput } from "react-native";

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
        marginHorizontal: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 4,
        shadowRadius: 4,
        borderRadius: 20,
    }
});

export default function HomeScreen({navigation}) {
    return (
        <View style={style.container}>
            <Text
            style={{fontSize: 30, textAlign: 'center'}}>
                What would you like to eat?
            </Text>

            <TextInput
                style={style.input}
                placeholder="Search for a restaurant"
            />
            <View style={{flexDirection: "row"}}>
                <Pressable style={style.button} onPress={ () => navigation.navigate('View')}>
                    <Text>
                        Saved Restaurant
                    </Text>
                </Pressable>
            
                
                <Pressable style={style.button} onPress={ () => navigation.navigate('Suggest')}>
                    <Text>
                        Give me suggestions
                    </Text>
                </Pressable> 
            </View>
        </View>
    )
}