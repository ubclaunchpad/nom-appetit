import Navigation from "@components/Navigation";
import { RestaurantInfoComponent } from "@components/RestaurantInfo";
import SearchInput from "@components/SearchInput";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuItemDisplay from "@components/MenuItemDisplay";

type MenuItem = {
  name: string;
  ingredients: string;
  description: string;
  price: number;
  image: string;
};

const items: MenuItem[] = [
  {
    name: "Burger",
    ingredients: "Cheese",
    description: "Cool Burger",
    price: 12.99,
    image: "test",
  },
  {
    name: "Burger",
    ingredients: "Cheese",
    description: "Cool Burger",
    price: 12.99,
    image: "test",
  },
  {
    name: "Burger",
    ingredients: "Cheese",
    description: "Cool Burger",
    price: 12.99,
    image: "test",
  },
  {
    name: "Burger",
    ingredients: "Cheese",
    description: "Cool Burger",
    price: 12.99,
    image: "test",
  },
];

export default function menu() {
  const [selectedFilter, setFilter] = useState("All");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={[styles.navigation, { marginTop: 10 }]}>
          <Navigation backNavigation="home" />
        </View>

        <View style={[styles.headerContainer, { marginTop: 20 }]}>
          <Text style={styles.header}>Reviews</Text>
        </View>

        <View style={[styles.categories, { marginTop: 20 }]}>
          <Pressable
            style={[
              styles.individualCategory,
              {
                backgroundColor:
                  selectedFilter === "All" ? "#FFFFFF" : "#F3CC91",
              },
            ]}
            onPress={() => setFilter("All")}
          >
            <Text style={styles.categoryText}>All Products</Text>
          </Pressable>

          <Pressable
            style={[
              styles.individualCategory,
              {
                backgroundColor:
                  selectedFilter === "category1" ? "#FFFFFF" : "#F3CC91",
              },
            ]}
            onPress={() => setFilter("category1")}
          >
            <Text style={styles.categoryText}>Categories</Text>
          </Pressable>

          <Pressable
            style={[
              styles.individualCategory,
              {
                backgroundColor:
                  selectedFilter === "category2" ? "#FFFFFF" : "#F3CC91",
              },
            ]}
            onPress={() => setFilter("category2")}
          >
            <Text style={styles.categoryText}>Categories</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.restaurantContainer,
            { marginTop: 20, marginBottom: 20 },
          ]}
        >
          <FlatList
            data={items}
            renderItem={({ item }) => <MenuItemDisplay {...item} />}
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
