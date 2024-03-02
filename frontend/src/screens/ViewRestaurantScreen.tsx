// view saved restaurant
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, View, Text, Pressable, StyleSheet } from "react-native";
import { RestaurantInfoComponent } from "../components/RestaurantInfoComponent";
import { RootStackParamList } from "src/types";

type Props = NativeStackScreenProps<RootStackParamList, "viewSavedRestaurants">;

export default function ViewSavedRestaurantsScreen({navigation}: Props) {

    const [active, setActive] = useState(true)

    
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

    if (active) {
        return (
            <View style={style.container}>
                <Button 
                title="Go Back"
                onPress={ () => navigation.navigate('home')}
                />
                <Text style={style.titleText}>
                    Saved Places
                </Text>
                <View style={style.slide}>
                    <Pressable style={style.activePage} onPress={ () => setActive(true)}> 
                        <Text allowFontScaling={false}>
                            Visited
                        </Text>
                    </Pressable>
                    <Pressable style={style.account} onPress={ () => setActive(false)}>
                        <Text allowFontScaling={false}>
                            Wishlist
                        </Text>
                    </Pressable>
                </View>


                <View style={style.restaurantContainer}>
                    {restaurants.map((restaurant, index) => (
                        <RestaurantInfoComponent key={index} {...restaurant} />
                    ))}
                </View>
            </View>

        )
    }
    else {
        return (
            <View style={style.container}>
                <Button 
                title="Go Back"
                onPress={ () => navigation.navigate('home')}
                />
                <Text style={style.titleText}>
                    Saved Places
                </Text>
                <View style={style.slide}>
                    <Pressable style={style.account} onPress={ () => setActive(true)}> 
                        <Text allowFontScaling={false}>
                            Visited
                        </Text>
                    </Pressable>
                    <Pressable style={style.activePage} onPress={ () => setActive(false)}>
                        <Text allowFontScaling={false}>
                            Wishlist
                        </Text>
                    </Pressable>
                </View>

                <View style={style.restaurantContainer}>
                    {restaurants.map((restaurant, index) => (
                        <RestaurantInfoComponent key={index} {...restaurant} />
                    ))}
                </View>
            </View>
        )
    }
}


const style = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        width: '100%',
        height: '100%',
    },

    titleText: {
        fontSize: 24,
        padding: 10
    },

    //the main slide button
    slide: {
        alignItems: 'center',
        zIndex: 2,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 4
    },

    buttons: {   
        backgroundColor: 'white',
        borderColor: '#FFFCF1',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 130,
        paddingVertical: 12,
        marginVertical: 13,
    },

    account: {
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 45,
        paddingVertical: 15,
        borderRadius: 20,
    },

    activePage: {
        backgroundColor: "#F3CC91",
        paddingVertical: 15,
        paddingHorizontal: 45,
        borderRadius: 20,
    },

    //Username/Password text
    input_header: {
        fontSize: 16,
        color: '#004643',
        alignSelf: 'flex-start',
        paddingTop: 10,
        paddingBottom: 5
    },
    restaurantContainer: {
        padding: 25,
        gap: 25
    }
});