// signup page
import React, { useEffect, useState, useRef} from "react";
import { SafeAreaView, Pressable, StyleSheet, Animated, Dimensions, Text, View, TouchableOpacity, TextInput} from "react-native";

const style = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCF7C2',
        width: '100%',
        height: '100%',
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
        flexDirection: 'row',
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
        position: 'relative',
        borderColor: '#FFFCF1',
        paddingHorizontal: 20,
        paddingVertical: 17,
        marginVertical: 5,
        flexDirection: 'row',
    },

    //Username/Password text
    input_header: {
        fontSize: 16,
        color: '#004643',
        alignSelf: 'flex-start',
        paddingTop: 10,
        paddingBottom: 5
    },

    activePage: {
        backgroundColor: "#F3CC91",
        marginLeft: 22,
        borderRadius: 50,
    },

    forgotPassword: {
        color: '#004643', 
        textDecorationLine: 'underline', 
        fontSize: 16
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
    },

    textInput: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#FFFCF1',
        borderWidth: 1,
        width: 340,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
    }
});

export default function SignupScreen({navigation}) {

    const [active, setActive] = useState(true)
    let transformX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        console.log(active)
        if (active) {
        Animated.timing(transformX, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()
        } else {
        Animated.timing(transformX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
        }
    }, [active]);

const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, Dimensions.get('screen').width / 2]
})

if (active)
{
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
                <Pressable style={style.Account} onPress={ () => setActive(false)}> 
                    <Text>
                        Create Account
                    </Text>
                </Pressable>
                <Pressable style={style.Account} onPress={ () => setActive(true)}>
                    <Text style={style.activePage}>
                        Sign in
                    </Text>
                </Pressable>
            </View>

            <View style={style.input}>
                <SafeAreaView>
                        <Text style={style.input_header}>
                            Username
                        </Text>

                        <TextInput style={style.textInput}
                            placeholder='Username'
                            placeholderTextColor='#769575'
                        />

                        <Text style={style.input_header}>
                            Password
                        </Text>

                        <TextInput style={style.textInput}
                            placeholder='Password'
                            placeholderTextColor='#769575'
                        />
                </SafeAreaView>
                
                <Pressable style={{ alignItems: 'flex-end' }} onPress={ () => navigation.navigate('Forgot Password')}>
                    <Text style={style.forgotPassword}>
                        Forgot Password?
                    </Text>
                </Pressable>
                
                <Pressable style={style.signInBottom} onPress={ () => navigation.navigate('Home')}>
                    <Text style={style.signInBottomText}>
                        Sign In
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
else
{
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
            <Pressable style={style.Account} onPress={ () => setActive(false)}> 
                    <Text style={style.activePage}>
                        Create Account
                    </Text>
                </Pressable>
                <Pressable style={style.Account} onPress={ () => setActive(true)}>
                    <Text >
                        Sign in
                    </Text>
                </Pressable>
            </View>

            <View style={style.input}>

                <SafeAreaView>

                    <Text style={style.input_header}>
                        Your name
                    </Text>

                    <TextInput style={style.textInput}
                        placeholder='Your name'
                        placeholderTextColor='#769575'
                    />

                    <Text style={style.input_header}>
                        Email address
                    </Text>

                    <TextInput style={style.textInput}
                        placeholder='Email Address'
                        placeholderTextColor='#769575'
                    />

                    <Text style={style.input_header}>
                        Create Username
                    </Text>

                    <TextInput style={style.textInput}
                        placeholder='Create Username'
                        placeholderTextColor='#769575'
                    />

                    <Text style={style.input_header}>
                        Create Password
                    </Text>

                    <TextInput style={style.textInput}
                        placeholder='Create Password'
                        placeholderTextColor='#769575'
                    />

                    <Text style={style.input_header}>
                        Confirm Password
                    </Text>

                    <TextInput style={style.textInput}
                        placeholder='Confirm Password'
                        placeholderTextColor='#769575'
                    />

                </SafeAreaView>
                
                <Pressable style={style.signInBottom} onPress={ () => navigation.navigate('Home')}>
                    <Text style={style.signInBottomText}>
                        Create Account
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
}