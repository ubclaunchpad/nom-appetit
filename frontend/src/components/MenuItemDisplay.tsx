import { View, Text, Image, StyleSheet } from "react-native";
import Images from "src/-assets/images";
import React from "react";

type Props = {
  name: string;
  ingredients: string;
  description: string;
  price: number;
  image: string;
};

const MenuItemDisplay = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image source={Images.dummyImage} style={styles.image} />

      <View>
        <Text style={styles.name}>{props.name}</Text>
        <View style={[styles.typesAndPrice, { paddingTop: 6 }]}>
          <Text style={styles.typesAndPriceText}>{props.ingredients}</Text>
          <Text style={styles.typesAndPriceText}>{props.description}</Text>
          <Text style={styles.priceText}>${props.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 150,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    paddingLeft: 30,
    borderRadius: 12,
  },
  image: {
    width: 110,
    height: 75,
    marginRight: 20,
    borderRadius: 12,
  },
  name: {
    fontFamily: "Lato",
    color: "#004643",
  },
  typesAndPrice: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  typesAndPriceText: {
    fontFamily: "Lato",
    fontSize: 10,
    color: "#004643",
  },
  priceText: {
    fontFamily: "Montserrat_700Bold",
    color: "#004643",
    fontSize: 12,
  },
  stars: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 5,
  },
  distance: {
    fontFamily: "Lato",
    fontSize: 10,
    color: "#004643",
  },
});

export default MenuItemDisplay;
