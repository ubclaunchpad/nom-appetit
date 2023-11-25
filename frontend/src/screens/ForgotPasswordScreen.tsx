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
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
        width: 285,
        fontWeight: '400'
    },

    text3 : {
        color: '#004643',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
        width: 285,
        fontWeight: '500',
        marginRight: 90
    },

    input: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        width: 300
    },

    sendEmail: {
        marginVertical: 40,
        borderRadius: 50,
        backgroundColor: "#F3CC91",
        paddingVertical: 8,
        paddingHorizontal: 40,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 4,
        shadowRadius: 4,
    },

    sendEmailText: {
        color: '#004643',
    },

    spacing: {
        marginBottom: 30
    },
    
    spacing2: {
        marginBottom: 20
    }

});

export default function ForgotPasswordScreen({navigation}) {
    return (
        <View style={style.container}>

            <Text style={style.text1}>
                <Text style={style.text1}>Reset Password</Text>
            </Text>

            <View style={style.spacing}></View>

            <Text style={style.text2}>
                <Text style={style.text2}>Instructions to reset your password will be sent to your email</Text>
            </Text>

            <View style={style.spacing2}></View>

            <Text style={style.text3}>
                <Text style={style.text3}>Registered Email Address</Text>
            </Text>

            <TextInput style={style.input}
                placeholder='Email Address'
            />

            <Pressable style={style.sendEmail} onPress={ () => navigation.navigate('Home')}>
                    <Text style={style.sendEmailText}>
                        Send Email
                    </Text>
            </Pressable>
            
        </View>
    )
}