// home page
import React from "react";
import { Button, View, StyleSheet, ScrollView } from "react-native";
import { RestaurantInfoComponent } from "../components/RestaurantInfoComponent";

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


export default function HomeScreen({navigation}) {
    return (
        <ScrollView style={styles.container}>
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
        backgroundColor: "#dee7c5"
    },
    parentContainer: {
        height: "100%",
    },

    restaurantContainer: {
        padding: 25,
        gap: 25
    }
})