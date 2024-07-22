import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "@components/StarRating";
import { Link } from "expo-router";
import Images from "@assets/images";

const restaurantDisplay = () => {
  // Place holder states
  const [location, setLocation] = useState("45 W 17 St, Vancouver, BC");
  const [times, setTimes] = useState("10am - 9pm");
  return (
    <SafeAreaView>
      <View style={styles.tempBackground}></View>
      <View style={styles.restaurantContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text>Restaurant Name</Text>
          <StarRating maxRating={5} onChange={() => {}} />
        </View>
        <View style={styles.location}>
          <Image source={Images.dummyLocation} />
          <View style={styles.locationDetails}>
            <Text>{location}</Text>
            <Text>{times}</Text>
          </View>
        </View>

        <View style={styles.spacedText}>
          <Text>Popular Dishes</Text>
          <Link href="menu">
            <Text>View All</Text>
          </Link>
        </View>
        <View style={styles.spacedText}>
          <Text>Reviews</Text>
          <Link href="reviews">
            <Text>View All</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tempBackground: {
    height: "30%",
    backgroundColor: "blue",
  },
  restaurantContainer: {
    minHeight: "100%",
    backgroundColor: "#FFFEFA",
    borderRadius: 20,
    marginTop: -90,
    padding: 20,
    alignItems: "center",
  },
  location: {
    alignItems: "center",
  },
  locationDetails: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spacedText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default restaurantDisplay;
