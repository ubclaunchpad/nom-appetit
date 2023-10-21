// search result
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function ResultScreen({navigation}) {
    return (
        <View>
            <Button 
            title="Go Back"
            onPress={ () => navigation.navigate('Search')}
            />
        </View>
    )
}