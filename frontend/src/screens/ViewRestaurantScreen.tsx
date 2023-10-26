// view saved restaurant
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function ViewRestaurantScreen({navigation}) {
    return (
        <View>
            <Button 
            title="Go Back"
            onPress={ () => navigation.navigate('Home')}
            />
        </View>
    )
}