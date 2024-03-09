// suggest a restaurant page
import React, { useEffect, useState } from "react";
import { Button, TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "filterRestaurant">;

export default function RestaurantFilterScreen ({navigation}: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text_header1}>
                    Location
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search location..."
                />
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
            </View>
            
            <View>
                <Text style={styles.text_header1}>
                    Type of Cuisine
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search cuisine type..."
                />
            </View>

            <View>
                <Text style={styles.text_header1}>
                    Rating
                </Text>
            </View>

            <View>
                <Text style={styles.text_header1}>
                    Price
                </Text>
                <View style={styles.priceContainer}>
                    <Pressable style={styles.priceButton}>
                        <Text allowFontScaling={false}>
                            $
                        </Text>
                    </Pressable>
                    <Pressable style={styles.priceButton}>
                        <Text allowFontScaling={false}>
                            $$
                        </Text>
                    </Pressable>
                    <Pressable style={styles.priceButton}>
                        <Text allowFontScaling={false}>
                            $$$
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCF7C2',
        width: '100%',
        height: '100%',
    },

    handler: {
        height: 20
    },

    text_header1 : {
        color: '#004643',
        fontSize: 20,
    },

    priceButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFCF1",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginHorizontal: 10
    },

    priceContainer: {
        padding: 10,
        flexDirection: 'row'
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