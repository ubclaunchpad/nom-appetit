import InputForm from "@components/InputForm";
import RestaurantInfo from "@components/RestaurantInfo";
import axios from "axios";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "src/context/SessionContext";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const { onLogout }= useSession();

  useEffect(() => {
    getLocation();
    searchRestaurants();
  }, [longitude, latitude]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location Permission Denied", "Please enable location services in your device settings to continue.");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLongitude(location["coords"]["longitude"]);
    setLatitude(location["coords"]["latitude"]);
  };

  const searchRestaurants = async () => {
    try {
      const params = {
        longitude: longitude,
        latitude: latitude,
        keywords: searchText.replace(/’/, ""),
      };
      if (locationText) {
        params["location"] = locationText;
      }
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "/searchRestaurants";
      const response = await axios.get(server_url, { params });
      const { invalid_token, restaurants } = response.data;
      if (invalid_token) {
        Alert.alert("Error", "Your sesssion expired. Please log in again.");
        onLogout();
        router.replace("../../");
      } else {
        setRestaurants(restaurants);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.main}>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.searchContainer}>
        <InputForm
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search for Restaurants, cuisine, occasion"
          onSubmitEditing={() => searchRestaurants()}
          iconName="search"
          autoCapitalize="words"
        />
        <InputForm
          value={locationText}
          onChangeText={setLocationText}
          placeholder="Current Location"
          onSubmitEditing={() => searchRestaurants()}
          iconName="location-pin"
          autoCapitalize="words"
        />
      </SafeAreaView>
      <View style={styles.restaurantContainer}>
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push({ pathname: "search/restaurant", params: { restaurant_id: item.id } })}>
              <RestaurantInfo
                restaurant_id={item.id}
                name={item.name}
                category={item.category}
                price={item.price}
                rating={item.rating}
                distance={item.distance}
                image_url={item.image_url}
                city={item.city}
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
  },
  restaurantContainer: {
    flex: 1,
    paddingTop: 20,
  },
});
