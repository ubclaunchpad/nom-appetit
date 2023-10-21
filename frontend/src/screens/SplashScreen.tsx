// splash page 
import React, { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";

export default function SplashScreen({navigation}) {
    return (
        <View>
            <Button 
            title="Go Home"
            onPress={ () => navigation.navigate('Signup')}
            />
        </View>
    )
}