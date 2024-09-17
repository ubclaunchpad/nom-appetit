import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

interface RestaurantProps {
  restaurant_id: string;
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
  const [savedRestaurant, setSavedRestaurant] = useState(false);

  const saveRestaurant = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL;
      const data = {
        restaurant_id: props.restaurant_id,
      };
      if (savedRestaurant) {
        setSavedRestaurant(false);
        const response = await axios.post(server_url + "unsaveRestaurant", data);
        const { invalid_token, success } = response.data;
        if (invalid_token) {
          Alert.alert("Error", "Your token expired. Please log in again.");
          router.replace("../../");
        }
      } else {
        setSavedRestaurant(true);
        const response = await axios.post(server_url + "saveRestaurant", data);
        const { invalid_token, success } = response.data;
        if (invalid_token) {
          Alert.alert("Error", "Your token expired. Please log in again.");
          router.replace("../../");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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
        {savedRestaurant ? (
          <Pressable onPress={saveRestaurant}>
            <Icon name="heart" type="material-community" color="#7F7E78" size={20} />
          </Pressable>
        ) : (
          <Pressable onPress={saveRestaurant}>
            <Icon name="heart-outline" type="material-community" color="#7F7E78" size={20} />
          </Pressable>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <Icon name="star" type="material" color="#FF462D" size={14} />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.detailsText}>
          {" "}
          • {category} • {price}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <Icon name="location-pin" type="material" color="#7F7E78" size={14} />
          <Text style={styles.detailsText}>{city}</Text>
        </View>
        <Text style={styles.detailsText}> • {distance}km away</Text>
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
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 12,
    color: "#747474",
  },
  rating: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 12,
    color: "#FF462D",
  },
});
