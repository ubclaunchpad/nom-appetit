// suggest a restaurant page
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function SuggestRestaurantScreen({navigation}) {
    return (
        <View>
            <Button 
            title="Go Back"
            onPress={ () => navigation.navigate('Home')}
            />
        </View>
    )
}