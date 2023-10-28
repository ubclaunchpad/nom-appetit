// signup page
import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, Text, TouchableOpacity } from "react-native";

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

            <Button 
            title="Test Sign In"
            onPress={ () => navigation.navigate('Home')}
            />
        </View>
        
    )
}