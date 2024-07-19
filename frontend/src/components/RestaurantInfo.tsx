import Images from "@assets/images";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

interface RestaurantProps {
  type: string;
  price: string;
  name: string;
  rating: number;
  distance: string;
}

export const RestaurantInfoComponent = (props: RestaurantProps) => {
  const truncateName = (name: string) => {
    if (name.length > 25) {
      return name.substring(0, 25 - 3) + "...";
    }
    return name;
  };

  const generateFullStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon name="star" type="font-awesome" color="#F9BC60" size={16} />
      );
    }
    return stars;
  };

  const generateHalfStar = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = Number((rating - fullStars).toFixed(1));
    if (halfStar == 0.4 || halfStar == 0.5) {
      return (
        <Icon
          name="star-half-o"
          type="font-awesome"
          color="#F9BC60"
          size={16}
        />
      );
    } else if (halfStar < 0.4) {
      return;
    } else if (halfStar > 0.5) {
      return <Icon name="star" type="font-awesome" color="#F9BC60" size={16} />;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Images.dummyImage} style={styles.image} />

      <View>
        <Text style={styles.name}>{truncateName(props.name)}</Text>

        <View style={[styles.typesAndPrice, { paddingTop: 6 }]}>
          <Text style={styles.typesAndPriceText}>{props.type} </Text>
          <Text style={styles.typesAndPriceText}>·</Text>
          <Text style={styles.typesAndPriceText}> {props.price}</Text>
        </View>

        <View style={[styles.stars, { paddingTop: 6 }]}>
          {generateFullStars(props.rating)}
          {generateHalfStar(props.rating)}
        </View>

        <Text style={[styles.distance, { paddingTop: 6 }]}>
          {props.distance}
        </Text>
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
    flexDirection: "row",
  },
  typesAndPriceText: {
    fontFamily: "Lato",
    fontSize: 10,
    color: "#004643",
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
