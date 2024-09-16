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
  city: string;
}

export default function RestaurantInfo(props: RestaurantProps) {
  const { image_url, name, rating, category, price, city, distance } = props;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image_url || "https://eldermoraes.com/wp-content/uploads/2023/05/placeholder.png",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.headerContainer}>
        <Text style={styles.name}>{name}</Text>
        <Icon name="heart-outline" type="material-community" color="#7F7E78" size={20} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <Icon name="star" type="material" color="#FF462D" size={12} />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.detailsText}>
          {" "}
          · {category} · {price}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <Icon name="location-pin" type="material" color="#7F7E78" size={12} />
          <Text style={styles.detailsText}>{city}</Text>
        </View>
        <Text style={styles.detailsText}> · {distance}km away</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 175,
    resizeMode: "cover",
    borderRadius: 12,
  },
  headerContainer: {
    marginTop: 8,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 16,
    color: "#1A1A1A",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  detailsText: {
    fontFamily:  "GT-America-Standard-Regular",
    fontSize: 10,
    color: "#747474",
  },
  rating: {
    fontFamily: "Lato-Black",
    fontSize: 10,
    color: "#FF462D",
  },
});
