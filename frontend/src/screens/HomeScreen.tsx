// home page
import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, ScrollView, Text, TextInput, Pressable} from "react-native";
import { RestaurantInfoComponent } from "../components/RestaurantInfoComponent";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SquareButton from "../components/SquareButton";
import Images from "../images/Images";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

// boilerplate for future restaurants
type Restaurant = {
    type: string;
    name: string;
    distance: string;
  };
    const restaurants: Restaurant[] = [
    {
        type: "Chinese",
        name: "Lin's Chinese Cuisine",
        distance: "1.2 km away",
    },
    {
      type: "Italian",
      name: "Trattoria",
      distance: "1.2 km away",
    },
    {
      type: "Mexican",
      name: "Taqueria",
      distance: "1.2 km away",
    },
    {
      type: "Japanese",
      name: "Koi Sushi",
      distance: "1.2 km away",
    },
    
  ];

export default function HomeScreen({navigation}: Props) {
    return (
        <ScrollView style={styles.container}>
            <Text
            style={{fontSize: 30, textAlign: 'center'}}>
                What would you like to eat?
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Search for a restaurant"
            />
            
        <SquareButton 
            text="Saved Restaurant" 
            onPress={() => navigation.navigate("home")}
            icon={Images.heartPNG} />
        <SquareButton 
            text="Give me suggestions" 
            onPress={() => navigation.navigate("home")}
            icon={Images.lighbulbPNG} />
        <Button 
        title="View Saved Restaurant"
        onPress={ () => navigation.navigate('viewSavedRestaurants')}
        />
        <Button 
        title="Suggest Restaurant"
        onPress={ () => navigation.navigate('suggestRestaurant')}
        />

        <Button 
        title="Go Back"
        onPress={ () => navigation.navigate('signIn')}
        />

        <Button 
        title="Search"
        onPress={ () => navigation.navigate('searchRestaurant')}
        />

        <View style={styles.restaurantContainer}>
            {restaurants.map((restaurant, index) => (
                <RestaurantInfoComponent key={index} {...restaurant} />
            ))}
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#dee7c5",
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#DCE7C2',
    },
    parentContainer: {
        height: "100%",
    },

    restaurantContainer: {
        padding: 25,
        gap: 25
    },

    text_header1 : {
        color: '#FFFCF1',
        fontSize: 20,
    },

    text_header2 : {
        color: '#FFFCF1',
        fontSize: 32,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10
    },

    button: {
        backgroundColor: "#F3CC91",
        color: "#004643",
        paddingHorizontal: 25,
        paddingVertical: 50,
        marginHorizontal: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 4,
        shadowRadius: 4,
        borderRadius: 20,
    }
})