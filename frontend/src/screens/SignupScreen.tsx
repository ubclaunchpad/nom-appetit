// signup page
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";

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