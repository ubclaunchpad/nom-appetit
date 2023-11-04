import React, { FunctionComponent } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { FlowContainer } from 'typescript';
import { RestaurantInfoContainer } from '../styles/Theme';

export const RestaurantInfoComponent = ({type, name, distance}) => {
    return(
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.imageContainer}>
                <Image
                source={require('../images/dummy-image.png')}
                style={styles.image}
                />
                </View>
            </View>
            <View style={styles.column}>
                <Text> {name} </ Text>
                <Text> {type} </ Text>
                <Text> {distance} </ Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
     ...RestaurantInfoContainer,
     flexDirection: "row",
     width: "100%",
     height: 150,
     alignItems: "center",
    },
    column: {
        flexDirection: "column",
        width: "50%",
        height: "50%",
    },

    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    imageContainer: {
        width: "60%",
        height: "100%",
        marginLeft: 50,
    },
})
