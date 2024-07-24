import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "@components/StarRating";
import { Link } from "expo-router";
import Images from "@assets/images";
import { ReviewInfo } from "@components/ReviewInfo";
import { Icon } from "react-native-elements";

const restaurantDisplay = () => {
  // Place holder states
  const [location, setLocation] = useState("45 W 17 St, Vancouver, BC");
  const [times, setTimes] = useState("10am - 9pm");

  type dish = {
    name: string;
    description: string;
    image: string;
  };

  const boilerReview = {
    name: "Bryan Tao",
    reviews: 10,
    photos: 5,
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  };

  const featuredDishes = [
    {
      name: "Poke",
      description: "Description",
      image: Images.dummyFood1,
    },
    {
      name: "Bento Box",
      description: "Description",
      image: Images.dummyFood2,
    },
    {
      name: "Salmon",
      description: "Description",
      image: Images.dummyFood2,
    },
  ];

  return (
    <SafeAreaView>
      <View style={styles.tempBackground}></View>
      <ScrollView style={styles.restaurantContainer}>
        <View style={styles.childRestaurantContainer}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantText}>Restaurant Name</Text>
            <StarRating maxRating={5} onChange={() => {}} size={18} />
          </View>
          <View style={styles.location}>
            <Image source={Images.dummyLocation} />
            <View style={styles.locationDetails}>
              <Text style={styles.locationText}>{location}</Text>
              <Text style={styles.locationText}>{times}</Text>
            </View>
          </View>

          <View style={styles.spacedHeader}>
            <Text style={styles.headerText}>Popular Dishes</Text>
            <Link href="menu">
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="arrow-forward-ios" color={"#004643"} size={20} />
              </View>
            </Link>
          </View>
          <View style={styles.featuredDishes}>
            {featuredDishes.map((dish, i) => {
              return (
                <View key={i} style={styles.featuredDish}>
                  <Image source={dish.image} style={styles.image} />
                  <Text style={styles.dishName}>{dish.name}</Text>
                  <Text numberOfLines={1} style={styles.dishDescription}>
                    {dish.description}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.spacedHeader}>
            <Text style={styles.headerText}>Reviews</Text>
            <Link href="reviews">
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="arrow-forward-ios" color={"#004643"} size={20} />
              </View>
            </Link>
          </View>
          <View style={styles.reviewContainer}>
            <ReviewInfo {...boilerReview} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tempBackground: {
    height: "30%",
    backgroundColor: "blue",
  },
  restaurantContainer: {
    backgroundColor: "#FFFEFA",
    borderRadius: 20,
    marginTop: -110,
    padding: 20,
    height: "90%",
  },
  childRestaurantContainer: {
    alignItems: "center",
    gap: 15,
  },
  restaurantHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantText: {
    fontFamily: "Lato",
    fontWeight: "600",
    fontSize: 24,
    color: "#004643",
  },
  location: {
    alignItems: "center",
  },
  locationDetails: {
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
  spacedHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featuredDishes: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  featuredDish: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 110,
    maxHeight: 125,
    borderRadius: 1,
    borderColor: "blue",
  },
  dishName: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    color: "#004643",
  },
  dishDescription: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: "#004643",
  },
  image: {
    maxWidth: 110,
    maxHeight: 75,
    borderRadius: 12,
  },
  headerText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    color: "#004643",
  },
  viewAllText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    color: "#004643",
  },
  reviewContainer: {
    maxWidth: "100%",
    justifyContent: "flex-start",
  },
});

export default restaurantDisplay;
