// home page
import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { RestaurantInfoComponent } from "../components/RestaurantInfoComponent";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SquareButton from "../components/SquareButton";
import Images from "../images/Images";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

// boilerplate for future restaurants
type Restaurant = {
  type: string;
  name: string;
  distance: string;
};
const restaurants: Restaurant[] = [
  {
    type: "Chinese",
    name: "Lin's Chinese Cuisine",
    distance: "1.2 km away",
  },
  {
    type: "Italian",
    name: "Trattoria",
    distance: "1.2 km away",
  },
  {
    type: "Mexican",
    name: "Taqueria",
    distance: "1.2 km away",
  },
  {
    type: "Japanese",
    name: "Koi Sushi",
    distance: "1.2 km away",
  },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.containerBackground}>
      <View style={styles.container}>
        <Text style={{ fontSize: 30, textAlign: "center", width: "75%" }}>
          What would you like to eat?
        </Text>
        <View>
          <TextInput
        <Pressable>
          <TextInput
            onPress={() => navigation.navigate("searchRestaurant")}
            style={styles.input}
            placeholder="Search for a restaurant"
          />
        </View>
            placeholder="Search for a restaurant"
          />
        </Pressable>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <SquareButton
            text="Saved Restaurant"
            onPress={() => navigation.navigate("viewSavedRestaurants")}
            icon={Images.heartPNG}
          />
          <View style={{ width: 15 }} />
          <SquareButton
            text="Give me suggestions"
            onPress={() => navigation.navigate("suggestRestaurant")}
            icon={Images.lighbulbPNG}
          />
        </View>
        <Button
          title="Filter Restaurant"
          onPress={() => navigation.navigate("filterRestaurant")}
        ></Button>
        <Button
          title="Individual Survey Question"
          onPress={() => navigation.navigate("individualSurvey")}
        ></Button>
        <Button
          title="Filter Restaurant"
          onPress={() => navigation.navigate("filterRestaurant")}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBackground: {
    flex: 1,
    width: "100%",
    backgroundColor: "#dee7c5",
  },
  container: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  parentContainer: {
    height: "100%",
  },

  restaurantContainer: {
    padding: 25,
    gap: 25,
  },

  text_header1: {
    color: "#FFFCF1",
    fontSize: 20,
  },

  text_header2: {
    color: "#FFFCF1",
    fontSize: 32,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 25,
    width: 345,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  button: {
    backgroundColor: "#F3CC91",
    color: "#004643",
    paddingHorizontal: 25,
    paddingVertical: 50,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 20,
  },


  icon: {
    marginLeft: 10,
    marginLeft: 10,
  },
});
