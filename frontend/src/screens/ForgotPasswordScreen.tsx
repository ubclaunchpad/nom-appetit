// Forgot Password page
import React, { useEffect, useState } from "react";
import { Pressable, View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";


const style = StyleSheet.create({

    outerContainer: {
        flex: 1,
        backgroundColor: '#DCE7C2',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 110,
    },

    container2: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCE7C2',
        paddingBottom: '10%',
    },

    container3: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCE7C2',
    },

    text_header1 : {
        color: '#FFFCF1',
        fontSize: 16,
        fontWeight: 'normal',
    },

    text_header2 : {
        color: '#FFFCF1',
        fontSize: 32,
        fontWeight: 'normal',
    },

    text1 : {
        flex: 0.80,
        color: '#004643',
        fontSize: 36,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'normal',
    },

    text2 : {
        color: '#004643',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
        width: 285,
        fontWeight: '400',
    },

    text3 : {
        color: '#004643',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
        width: 285,
        fontWeight: '500',
        marginRight: '30%',
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

});

export default function ForgotPasswordScreen({navigation}) {
    return (
        <View style={style.outerContainer}>
            <View style={style.container}>

                <View style={style.container2}>
                    <Text allowFontScaling={false} style={style.text1}>
                        <Text allowFontScaling={false} style={style.text1}>Reset Password</Text>
                    </Text>

                    <Text allowFontScaling={false} style={style.text2}>
                        <Text allowFontScaling={false} style={style.text2}>Instructions to reset your password will be sent to your email</Text>
                    </Text>
                </View>

                <View style={style.container3}>

                    <Text allowFontScaling={false} style={style.text3}>
                        <Text allowFontScaling={false} style={style.text3}>Registered Email Address</Text>
                    </Text>

                    <TextInput allowFontScaling={false} style={style.input}
                        placeholder='Email Address'
                    />
                </View>

                <Pressable style={style.sendEmail} onPress={ () => navigation.navigate('Home')}>
                        <Text allowFontScaling={false} style={style.sendEmailText}>
                            Send Email
                        </Text>
                </Pressable>
                
            </View>
        </View>
    )
}