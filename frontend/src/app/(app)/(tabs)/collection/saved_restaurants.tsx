// TEMPORARY FILE CHANGE

import Navigation from "@components/Navigation";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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
import axios from "axios";

const SavedRestaurants = () => {
  const [savedRestaurants, setSavedRestaurants] = useState([]);

  useEffect(() => {
    const date = new Date();

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          process.env.EXPO_PUBLIC_SERVER_URL + "/getSavedRestaurants",
          {
            params: {
              current_day: date.getDay(),
            },
          }
        );
        console.log(data);
        setSavedRestaurants(data["saved_restaurants"]);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.containerBackground}>
      <SafeAreaView style={{ marginTop: 20, justifyContent: "center" }}>
        <Text style={styles.title}>My Saved Restaurants</Text>
      </SafeAreaView>

      <View style={styles.restaurantContainer}>
        <FlatList
          data={savedRestaurants}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                router.navigate({
                  pathname: "search/restaurant",
                  params: { restaurant_id: item.id },
                });
              }}
            >
              <RestaurantInfo
                restaurant_id={item.id}
                city={item.city}
                name={item.name}
                category={item.category}
                price={item.price}
                rating={item.rating}
                distance={item.distance}
                image_url={item.imageURL}
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100%",
    minHeight: "100%",
    backgroundColor: "white",
    gap: 20,
  },
  title: {
    fontFamily: "GT-America-Standard-Bold",
    fontWeight: "600",
    fontSize: 28,
    color: "#1A1A1A",
  },
  restaurantContainer: {
    flex: 1,
    width: 334,
  },
});

export default SavedRestaurants;
