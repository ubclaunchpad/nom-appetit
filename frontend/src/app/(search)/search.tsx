import Navigation from "@components/Navigation";
import { RestaurantInfoComponent } from "@components/RestaurantInfo";
import SearchInput from "@components/SearchInput";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

type Restaurant = {
  type: string;
  price: string;
  name: string;
  rating: number;
  distance: string;
};

const restaurants: Restaurant[] = [
  {
    type: "Chinese",
    price: "$$",
    name: "Lin's Chinese Cuisine",
    rating: 4.1,
    distance: "1.2 km away",
  },
  {
    type: "Italian",
    price: "$$$",
    name: "Trattoria",
    rating: 3.4,
    distance: "1.2 km away",
  },
  {
    type: "Mexican",
    price: "$",
    name: "Taqueria",
    rating: 3.6,
    distance: "1.2 km away",
  },
  {
    type: "Japanese",
    price: "$$",
    name: "Koi Sushi",
    rating: 2.4,
    distance: "1.2 km away",
  },
];

export default function Search() {
  const [restaurant, setRestaurant] = useState("");
  const [popularIsPressed, setPopularIsPressed] = useState(true);
  const [recentlyViewedIsPressed, setRecentlyViewedIsPressed] = useState(false);
  const [nearYouIsPressed, setNearYouIsPressed] = useState(false);

  const handlePopular = () => {
    setPopularIsPressed(true);
    setRecentlyViewedIsPressed(false);
    setNearYouIsPressed(false);
  };
  const handleRecentlyViewed = () => {
    setPopularIsPressed(false);
    setRecentlyViewedIsPressed(true);
    setNearYouIsPressed(false);
  };
  const handleNearYou = () => {
    setPopularIsPressed(false);
    setRecentlyViewedIsPressed(false);
    setNearYouIsPressed(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={[styles.navigation, { marginTop: 10 }]}>
          <Navigation backNavigation="home"/>
        </View>

        <View style={[styles.headerContainer, { marginTop: 20 }]}>
          <Text style={styles.header}>Search Restaurants</Text>
        </View>

        <Pressable
          style={[styles.form, { marginTop: 30 }]}
          onPress={() => router.push("(search)/filter")}
        >
          <SearchInput
            value={restaurant}
            onChangeText={setRestaurant}
            autoCapitalize="words"
            width="82%"
            placeholder="Search for a restaurant..."
          />
          <View style={styles.filterButton}>
            <Icon name="filter" type="font-awesome" color="#004643" size={25} />
          </View>
        </Pressable>

        <View style={[styles.categories, { marginTop: 20 }]}>
          <Pressable
            style={[
              styles.individualCategory,
              { backgroundColor: popularIsPressed ? "#FFFFFF" : "#F3CC91" },
            ]}
            onPress={handlePopular}
          >
            <Text style={styles.categoryText}>Popular</Text>
          </Pressable>

          <Pressable
            style={[
              styles.individualCategory,
              {
                backgroundColor: recentlyViewedIsPressed
                  ? "#FFFFFF"
                  : "#F3CC91",
              },
            ]}
            onPress={handleRecentlyViewed}
          >
            <Text style={styles.categoryText}>Recently Viewed</Text>
          </Pressable>

          <Pressable
            style={[
              styles.individualCategory,
              { backgroundColor: nearYouIsPressed ? "#FFFFFF" : "#F3CC91" },
            ]}
            onPress={handleNearYou}
          >
            <Text style={styles.categoryText}>Near You</Text>
          </Pressable>
        </View>

        <View style={[styles.restaurantContainer, { marginTop: 20, marginBottom: 20}]}>
          <FlatList
            data={restaurants}
            renderItem={({ item }) => <RestaurantInfoComponent {...item} />}
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
    backgroundColor: "pink",
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
  }
});

