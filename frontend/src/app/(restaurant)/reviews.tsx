import Navigation from "@components/Navigation";
import { RestaurantInfoComponent } from "@components/RestaurantInfo";
import SearchInput from "@components/SearchInput";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReviewInfo } from "@components/ReviewInfo";

type Review = {
  name: string;
  reviews: number;
  photos: number;
  rating: number;
  time: string;
  description: string;
};

const listReview: Review[] = [
  {
    name: "Bryan Tao",
    reviews: 10,
    photos: 5,
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Name",
    reviews: 10,
    photos: 5,
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Name",
    reviews: 10,
    photos: 5,
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Name",
    reviews: 10,
    photos: 5,
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
];

export default function reviews() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={[styles.navigation, { marginTop: 10 }]}>
          <Navigation backNavigation="home" />
        </View>

        <View style={[styles.headerContainer, { marginTop: 20 }]}>
          <Text style={styles.header}>Reviews</Text>
        </View>

        <View
          style={[
            styles.restaurantContainer,
            { marginTop: 20, marginBottom: 20 },
          ]}
        >
          <FlatList
            data={listReview}
            renderItem={({ item }) => <ReviewInfo {...item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
  main: {
    width: 334,
    flex: 1,
  },
  navigation: {
    // backgroundColor: "red",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Lato",
    color: "#004643",
    // backgroundColor: "yellow",
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3CC91",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "green",
  },
  individualCategory: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryText: {
    fontFamily: "Lato",
    color: "#004643",
  },
  restaurantContainer: {
    flex: 1,
    // backgroundColor: "blue",
  },
  restaurant: {
    backgroundColor: "white",
    width: "100%",
    height: 115,
    borderRadius: 12,
  },
});
