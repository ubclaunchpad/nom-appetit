// home page
import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import { RestaurantInfoComponent } from "../components/RestaurantInfoComponent";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";

// boilerplate for future restaurants
type Restaurant = {
  type: string;
  name: string;
  rating: number;
  distance: string;
};
const restaurants: Restaurant[] = [
  {
    type: "Chinese",
    name: "Lin's Chinese Cuisine",
    rating: 4,
    distance: "1.2 km away",
  },
  {
    type: "Italian",
    name: "Trattoria",
    rating: 3.5,
    distance: "1.2 km away",
  },
  {
    type: "Mexican",
    name: "Taqueria",
    rating: 2,
    distance: "1.2 km away",
  },
  {
    type: "Japanese",
    name: "Koi Sushi",
    rating: 5,
    distance: "1.2 km away",
  },
];

type Props = NativeStackScreenProps<RootStackParamList, "selectedRestaurant">;

export default function SelectedRestaurantScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            width: "75%",
            marginVertical: 10,
          }}
        >
          Search Results
        </Text>
        <View style={styles.inputContainer}>
          <Pressable>
            <TextInput
              onPress={() => navigation.navigate("searchRestaurant")}
              style={styles.input}
              placeholder="Search for a restaurant..."
              placeholderTextColor={"#8FA68E"}
            />
          </Pressable>
          <View
            style={{
              padding: 10,
              backgroundColor: "#f3cc91",
              borderRadius: 12,
            }}
          >
            <Icon
              onPress={() => navigation.navigate("filterRestaurant")}
              name="filter"
              type="font-awesome"
              color="#004643"
              size={24}
            />
          </View>
        </View>

        <FlatList
          data={restaurants}
          renderItem={({ item }) => <RestaurantInfoComponent {...item} />}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerBackground: {
    width: "100%",
    backgroundColor: "#dee7c5",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  parentContainer: {
    height: "100%",
  },

  restaurantContainer: {
    paddingHorizontal: 20,
  },

  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },

  input: {
    backgroundColor: "#fffefa",
    minHeight: 48,
    color: "#9db19b",
    borderColor: "#80a29e",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: 304,
  },
});
