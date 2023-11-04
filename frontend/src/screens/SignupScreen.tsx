// signup page
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";

export default function SignupScreen({navigation}) {
    return (
        <View>
            <Button 
            title="Test Sign In"
            onPress={ () => navigation.navigate('Home')}
            />
        </View>
    )
}

