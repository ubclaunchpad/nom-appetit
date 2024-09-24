import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface BusinessHour {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
}

interface Category {
  alias: string;
  title: string;
}

interface RestaurantProps {
  restaurant_id: string;
  name: string;
  coordinates: Array<Coordinate>;
  location: Location;
  isDistance?: boolean;
  distance: number;
  image_url: string;
  price: string;
  business_hours: Array<BusinessHour>;
  categories: Array<Category>;
  rating: number;
  path: string;
}

export default function RestaurantInfo(props: RestaurantProps) {
  const name = props.name;
  const latitude = props.coordinates["latitude"];
  const longitude = props.coordinates["longitude"];
  const address = props.location["address1"];
  const city = props.location["city"];
  const state = props.location["state"];
  const distance = props.distance;
  const image_url = props.image_url;
  const price = props.price;
  const business_hours = props.business_hours;
  const categories = props.categories;
  const rating = props.rating;
  const isDistance = props.isDistance;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: props.path + "/restaurant",
          params: {
            restaurant_id: props.restaurant_id,
          },
        })
      }
    >
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
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            <Icon name="star" type="material" color="#FF462D" size={14} />
            <Text style={styles.rating}>{props.rating}</Text>
          </View>
          <Text style={styles.detailsText}>
            {" "}
            • {categories[0]["title"]} • {price}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            <Icon name="location-pin" type="material" color="#7F7E78" size={14} />
            <Text style={styles.detailsText}>
              {city}, {state}
            </Text>
          </View>
          {isDistance ? <Text style={styles.detailsText}> • {distance}km away</Text> : null}
        </View>
      </View>
    </Pressable>
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
