import Navigation from "@components/Navigation";
import ProfileDisplay from "@components/ProfileDisplay";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantInfo from "@components/RestaurantInfo";
import Images from "src/-assets/images";
import Switch from "@components/Switch";

type restaurant = {
  name: string;
  category: string;
  price: string;
  rating: number;
  distance: string;
  image_url: string;
};

const visited_restaurants: restaurant[] = [
  {
    name: "Burger Town",
    category: "Burgers",
    price: "$$",
    rating: 4,
    distance: "12",
    image_url: Images.dummyImage,
  },
  {
    name: "Burger Town",
    category: "Burgers",
    price: "$$",
    rating: 4,
    distance: "12",
    image_url: Images.dummyImage,
  },
  {
    name: "Burger Town",
    category: "Burgers",
    price: "$$",
    rating: 4,
    distance: "12",
    image_url: Images.dummyImage,
  },
  {
    name: "Burger Town",
    category: "Burgers",
    price: "$$",
    rating: 4,
    distance: "12",
    image_url: Images.dummyImage,
  },
];

const SavedRestaurants = () => {
  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={{ width: 334 }}>
        <Navigation
          leftIcon="arrow-left"
          rightIcon="home"
          leftNavigationOnPress={() => router.back()}
        />
      </View>
      <Text style={styles.title}>My Saved Restaurants</Text>
      <View style={styles.restaurantContainer}>
        <FlatList
          data={visited_restaurants}
          renderItem={({ item }) => (
            <RestaurantInfo
              name={item.name}
              category={item.category}
              price={item.price}
              rating={item.rating}
              distance={item.distance}
              image_url={item.image_url}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100%",
    minHeight: "100%",
    backgroundColor: "#E6EFD9",
    gap: 20,
  },
  title: {
    fontFamily: "Lato",
    fontWeight: 600,
    fontSize: 24,
    color: "#004643",
    marginBottom: 5,
  },
  switchContainer: {
    marginTop: 10,
    maxWidth: 334,
  },
  restaurantContainer: {
    flex: 1,
    width: 334,
  },
});

export default SavedRestaurants;
