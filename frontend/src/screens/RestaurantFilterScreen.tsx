// suggest a restaurant page
import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";

type Props = NativeStackScreenProps<RootStackParamList, "filterRestaurant">;

export default function RestaurantFilterScreen({ navigation }: Props) {
  const [distance, setDistance] = useState(20);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.searchContainer}>
          <Text style={styles.text_header1}>Location</Text>
          <View style={styles.searchInput}>
            <FontAwesome name="search" size={20} color="black" />
            <TextInput style={styles.input} placeholder="Search location..." />
          </View>
        </View>

        <View style={styles.slidercontainer}>
          <Text>Within</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={40}
            value={distance}
            minimumTrackTintColor="#004643"
            maximumTrackTintColor="#000000"
            thumbTintColor="#004643"
            onValueChange={(value) => {
              setDistance(Math.round(value));
            }}
          />
          <Text>{distance} km</Text>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.text_header1}>Type of Cuisine</Text>
          <View style={styles.searchInput}>
            <FontAwesome name="search" size={20} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Search cuisine type..."
            />
          </View>
        </View>
        <Text style={styles.text_header1}>Rating</Text>
        <View style={styles.rating}>
          <StarRating
            rating={rating}
            onChange={setRating}
            enableHalfStar={false}
            color="#f9bc60"
            starSize={64}
          />
        </View>

        <Text style={styles.text_header1}>Price</Text>
        <View style={styles.priceContainer}>
          {price === "1" ? (
            <Pressable
              onPress={() => setPrice("1")}
              style={styles.selectedPrice}
            >
              <Text>$</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => setPrice("1")} style={styles.priceButton}>
              <Text>$</Text>
            </Pressable>
          )}
          {price === "2" ? (
            <Pressable
              onPress={() => setPrice("2")}
              style={styles.selectedPrice}
            >
              <Text>$$</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => setPrice("2")} style={styles.priceButton}>
              <Text>$$</Text>
            </Pressable>
          )}
          {price === "3" ? (
            <Pressable
              onPress={() => setPrice("3")}
              style={styles.selectedPrice}
            >
              <Text>$$$</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => setPrice("3")} style={styles.priceButton}>
              <Text>$$$</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.applyFiltersContainer}>
          <Pressable style={styles.resetButton}>
            <Text>Reset</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("selectedRestaurant")}
            style={styles.applyButton}
          >
            <Text style={{ color: "white" }}>Apply</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    textAlign: "left",
    backgroundColor: "#e6efd9",
    height: "100%",
  },

  subContainer: {
    marginHorizontal: 30,
  },

  text_header1: {
    color: "#004643",
    fontSize: 18,
    fontWeight: "500",
  },

  searchContainer: {
    marginTop: 30,
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#9fb9b5",
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 9,
    gap: 10,
  },

  input: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
  },

  slidercontainer: {
    borderWidth: 1,
    borderColor: "#9fb9b5",
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  rating: {
    alignItems: "center",
    marginVertical: 12.5,
  },

  priceButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  selectedPrice: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3CC91",
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  priceContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 7.5,
    gap: 25,
  },

  applyFiltersContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },

  resetButton: {
    backgroundColor: "#F3CC91",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },

  applyButton: {
    backgroundColor: "#6F846E",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
