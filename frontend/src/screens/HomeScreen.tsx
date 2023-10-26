// home page
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function HomeScreen({navigation}) {
    return (
        <View>
            <Button 
            title="View Restaurant"
            onPress={ () => navigation.navigate('View')}
            />
            <Button 
            title="Suggest Restaurant"
            onPress={ () => navigation.navigate('Suggest')}
            />

            <Button 
            title="Go Back"
            onPress={ () => navigation.navigate('Signup')}
            />

            <Button 
            title="Search"
            onPress={ () => navigation.navigate('Search')}
            />
        </View>
    )
}