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

const restaurantDisplay = () => {
  // Place holder states
  const [location, setLocation] = useState("45 W 17 St, Vancouver, BC");
  const [times, setTimes] = useState("10am - 9pm");

  const boilerReview = {
    name: "Bryan Tao",
    reviews: 10,
    photos: 5,
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  };

  const featuredDishes = {
    name: "test",
  };

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
              <Text style={styles.viewAllText}>View All</Text>
            </Link>
          </View>
          <View style={styles.featuredDishes}>
            <Image source={Images.dummyFood1} style={styles.image} />
            <Image source={Images.dummyFood2} style={styles.image} />
            <Image source={Images.dummyFood2} style={styles.image} />
          </View>
          <View style={styles.spacedHeader}>
            <Text style={styles.headerText}>Reviews</Text>
            <Link href="reviews">
              <Text style={styles.viewAllText}>View All</Text>
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
  image: {
    maxWidth: 110,
    maxHeight: 75,
    borderRadius: 12,
  },
  headerText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
  },
  viewAllText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
  },
  reviewContainer: {
    maxWidth: "100%",
    justifyContent: "flex-start",
  },
});

export default restaurantDisplay;
