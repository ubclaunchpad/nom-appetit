// signup page
import React, { useEffect, useState } from "react";
import { Pressable, View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";

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

export default function SignupScreen({navigation}) {
    return (
        
        <View style={style.container}>

            <Text style={style.text_header1}>
                <Text style={style.text_header1}>Welcome to</Text>
            </Text>

            <Text style={style.text_header2}>
                <Text style={style.text_header2}>Nom Appetit</Text>
            </Text>

            <TextInput style={style.input}
                placeholder='Username'
            />
            <TextInput style={style.input}
                placeholder='Password'
            />
            

            <Pressable onPress={ () => navigation.navigate('Home')}>
                <Text>
                    Sign In
                </Text>
            </Pressable>
            
        </View>
        
    )
}