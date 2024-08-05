import Images from "@assets/images";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

interface RestaurantProps {
  category: string;
  price: string;
  name: string;
  rating: number;
  distance: string;
  image_url: string;
}

export default function RestaurantInfo(props: RestaurantProps) {
  const truncateName = (name: string) => {
    if (name.length > 22) {
      return name.substring(0, 22 - 3) + "...";
    }
    return name;
  };

  const generateFullStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`full-star-${i}`}
          name="star"
          type="font-awesome"
          color="#F9BC60"
          size={16}
        />
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
          key="half-star"
          name="star-half-o"
          type="font-awesome"
          color="#F9BC60"
          size={16}
        />
      );
    } else if (halfStar < 0.4) {
      return;
    } else if (halfStar > 0.5) {
      return (
        <Icon
          key="full-star"
          name="star"
          type="font-awesome"
          color="#F9BC60"
          size={16}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: props.image_url ? props.image_url : "https://eldermoraes.com/wp-content/uploads/2023/05/placeholder.png",
        }}
        style={styles.image}
      />
      <View>
        <Text style={styles.nameContainer}>{truncateName(props.name)}</Text>
        <View style={styles.categoryAndPriceContainer}>
          <Text style={styles.categoryAndPriceText}>{props.category} </Text>
          <Text style={styles.categoryAndPriceText}>·</Text>
          <Text style={styles.categoryAndPriceText}> {props.price}</Text>
        </View>
        <View style={styles.starsContainer}>
          {generateFullStars(props.rating)}
          {generateHalfStar(props.rating)}
        </View>
        <Text style={styles.distanceContainer}>{props.distance}km away</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 140,
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
  nameContainer: {
    fontFamily: "Lato",
    color: "#004643",
    marginTop: 5,
  },
  categoryAndPriceContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  categoryAndPriceText: {
    fontFamily: "Lato",
    fontSize: 10,
    color: "#004643",
  },
  starsContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
  },
  distanceContainer: {
    fontFamily: "Lato",
    fontSize: 10,
    color: "#004643",
    marginTop: 5,
  },
});
