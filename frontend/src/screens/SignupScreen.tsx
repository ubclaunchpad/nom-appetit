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

    //Welcome message (Welcome to Nom Appetit)
    welcome_message: {
        color: '#004643',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text_header1: {
        fontSize: 17,
    },

    text_header2: {
        fontSize: 32,
    },

    input: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttons: {
        backgroundColor: 'white',
        borderColor: '#FFFCF1',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 80,
        paddingVertical: 10,
        marginVertical: 5
    },

    Account: {
        backgroundColor: 'white',
        borderColor: '#FFFCF1',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection: 'row'
    },

    signInPage: {
        backgroundColor: "#F3CC91",
        marginLeft: 22,
        borderRadius: 50,
    },

    forgotPassword: {
        marginVertical: 20,
        color: '#004643', 
        textDecorationLine: 'underline', 
        fontSize: 16
    },

    signInBottom: {
        marginVertical: 20,
        borderRadius: 50,
        backgroundColor: "#F3CC91",
        paddingVertical: 8,
        paddingHorizontal: 40
    }
});

export default function SignupScreen({navigation}) {
    return (
        <View style={style.container}>
            <View style={style.welcome_message}>
                <Text style={style.text_header1}>
                    <Text style={style.text_header1}>Welcome to</Text>
                </Text>
                <Text style={style.text_header2}>
                    <Text style={style.text_header2}>Nom Appetit</Text>
                </Text>
            </View>

            <View style={style.input}>
                <Pressable style={style.Account} onPress={ () => navigation.navigate('Forgot Password')}> 
                    <Text>
                        Create Account
                    </Text>
                    
                    <Text style={style.signInPage}>
                        Sign in
                    </Text>
                </Pressable>
                <TextInput style={style.buttons}
                    placeholder='Username'
                />
                <TextInput style={style.buttons}
                    placeholder='Password'
                />
                <Pressable style={{ alignItems: 'flex-end' }} onPress={ () => navigation.navigate('Forgot Password')}>
                    <Text style={style.forgotPassword}>
                        Forgot Password?
                    </Text>
                </Pressable>
                
                <Pressable style={style.signInBottom} onPress={ () => navigation.navigate('Home')}>
                    <Text>
                        Sign In
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}