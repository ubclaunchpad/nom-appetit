// home page
import React from "react";
import { Button, View, StyleSheet, ScrollView } from "react-native";
import { RestaurantInfoComponent } from "../components/RestaurantInfoComponent";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
            <Button 
            title="View Restaurant"
            onPress={ () => navigation.navigate('view')}
            />
            <Button 
            title="Suggest Restaurant"
            onPress={ () => navigation.navigate('suggest')}
            />

            <Button 
            title="Go Back"
            onPress={ () => navigation.navigate('signIn')}
            />

            <Button 
            title="Search"
            onPress={ () => navigation.navigate('search')}
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