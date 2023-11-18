// create account screen
import React, { useEffect, useState } from "react";
import { Pressable, View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";

const style = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCF7C2',
    },

    //Welcome message (Welcome to Nom Appetit)
    welcome_message: {
        flex: 0.43,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 110,
    },

    //Welcome to
    text_header1: {
        fontSize: 17,
        color: '#004643',
    },

    //Nom Appetit
    text_header2: {
        fontSize: 32,
        color: '#004643',
    },

    //the main slide button
    slide: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 180,
        backgroundColor: '#DCF7C2',
        zIndex: 2,
    },

    //the other input fields and buttons (everything below the slide button)
    input: {
        flex: 1,
        alignItems: 'center',
        top: 60,
        backgroundColor: '#DCF7C2',
        zIndex: 1,
    },

    buttons: {   
        backgroundColor: 'white',
        borderColor: '#FFFCF1',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 130,
        paddingVertical: 12,
        marginVertical: 13,
    },

    Account: {
        backgroundColor: 'white',
        borderColor: '#FFFCF1',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 80,
        paddingVertical: 17,
        marginVertical: 5,
        flexDirection: 'row'
    },

    //Username/Password text
    input_header: {
        fontSize: 16,
        color: '#004643',
        alignSelf: 'flex-start',
    },

    signInPage: {
        backgroundColor: "#F3CC91",
        marginLeft: 22,
        borderRadius: 50,
    },

    signInBottom: {
        marginVertical: 40,
        borderRadius: 50,
        backgroundColor: "#F3CC91",
        paddingVertical: 8,
        paddingHorizontal: 40
    },

    signInBottomText: {
        color: '#004643',
    }
});

export default function createAccountScreen({navigation}) {
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

            <View style={style.slide}>
                <Pressable style={style.Account} onPress={ () => navigation.navigate('Signup')}> 
                    <Text style={style.signInPage}>
                        Create Account
                    </Text>
                    
                    <Text>
                        Sign in
                    </Text>
                </Pressable>
            </View>

            <View style={style.input}>

                <Text style={style.input_header}>
                    Your name
                </Text>

                <TextInput style={style.buttons}
                    placeholder='Your name'
                    placeholderTextColor='#769575'
                />

                <Text style={style.input_header}>
                    Email address
                </Text>

                <TextInput style={style.buttons}
                    placeholder='Email Address'
                    placeholderTextColor='#769575'
                />

                <Text style={style.input_header}>
                    Create Username
                </Text>

                <TextInput style={style.buttons}
                    placeholder='Create Username'
                    placeholderTextColor='#769575'
                />

                <Text style={style.input_header}>
                    Create Password
                </Text>

                <TextInput style={style.buttons}
                    placeholder='Create Password'
                    placeholderTextColor='#769575'
                />

                <Text style={style.input_header}>
                    Confirm Password
                </Text>

                <TextInput style={style.buttons}
                    placeholder='Confirm Password'
                    placeholderTextColor='#769575'
                />
                
                <Pressable style={style.signInBottom} onPress={ () => navigation.navigate('Home')}>
                    <Text style={style.signInBottomText}>
                        Sign In
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}