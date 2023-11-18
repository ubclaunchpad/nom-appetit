// Forgot Password page
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

    text1 : {
        color: '#004643',
        fontSize: 32,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

    text2 : {
        color: '#004643',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
    },

    input: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5
    },

    sendEmail: {
        marginVertical: 40,
        borderRadius: 50,
        backgroundColor: "#F3CC91",
        paddingVertical: 8,
        paddingHorizontal: 40
    },

    sendEmailText: {
        color: '#004643',
    }
});

export default function ForgotPasswordScreen({navigation}) {
    return (
        <View style={style.container}>

            {/* <Text style={style.text_header1}>
                <Text style={style.text_header1}>Welcome to</Text>
            </Text>

            <Text style={style.text_header2}>
                <Text style={style.text_header2}>Nom Appetit</Text>
            </Text> */}

            <Text style={style.text1}>
                <Text style={style.text1}>Reset Password</Text>
            </Text>

            <Text style={style.text2}>
                <Text style={style.text2}>Instructions to reset your password will be sent to your email</Text>
            </Text>

            <TextInput style={style.input}
                placeholder='Registered Email Address'
            />

            {/* <Pressable style={{ alignItems: 'flex-end' }} onPress={ () => navigation.navigate('Send Email')}>
                <Text style={{ color: '#004643', fontSize: 16 }}>Send Email</Text>
            </Pressable> */}

            <Pressable style={style.sendEmail} onPress={ () => navigation.navigate('Home')}>
                    <Text style={style.sendEmailText}>
                        Send Email
                    </Text>
            </Pressable>
            
        </View>
    )
}