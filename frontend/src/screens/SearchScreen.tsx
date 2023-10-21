// search restaurant
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function SearchScreen({navigation}) {
    return (
        <View>
            <Button 
            title="Execute Search"
            onPress={ () => navigation.navigate('Result')}
            />
        </View>
    )
}