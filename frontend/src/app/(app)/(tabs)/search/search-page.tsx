import InputForm from "@components/InputForm";
import NavigatorTab from "@components/NavigatorTab";
import RestaurantInfo from "@components/RestaurantInfo";
import axios from "axios";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, Icon, Tab } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { token, longitude, latitude, initialSearchText } = useLocalSearchParams();
  const [searchText, setSearchText] = useState(initialSearchText as string);
  const [locationText, setLocationText] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [index, setIndex] = useState(0);

  // TODO: Implement heart icon functionality
  // TODO: Implement location filter

  useEffect(() => {
    searchRestaurants("");
  }, []);

  const searchRestaurants = async (textVariable: string) => {
    try {
      const data = {
        longitude: longitude,
        latitude: latitude,
        keywords: textVariable.replace(/’/, ""),
      };
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "searchRestaurants";
      const response = await axios.post(server_url, data);
      const { invalid_token, restaurants } = response.data;
      if (invalid_token) {
        router.replace("/");
      } else {
        setRestaurants(restaurants);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <SafeAreaView edges={["top", "left", "right"]} style={styles.searchContainer}>
          <InputForm
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search for Restaurants, cuisine, occasion"
            onSubmitEditing={() => searchRestaurants(searchText as string)}
            iconName="search"
            autoCapitalize="words"
          />
          <InputForm
            value={locationText}
            onChangeText={setLocationText}
            placeholder="Current Location"
            onSubmitEditing={() => {}}
            iconName="location-pin"
            autoCapitalize="words"
          />
        </SafeAreaView>
        <View style={styles.restaurantContainer}>
          <FlatList
            data={restaurants}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "search/restaurant",
                    params: {
                      token: token,
                      id: item.id,
                      name: item.name,
                      category: item.category,
                      price: item.price,
                      rating: item.rating,
                      distance: item.distance,
                      image_url: item.image_url,
                      city: item.city,
                    },
                  })
                }
              >
                <RestaurantInfo
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  main: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 30,
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  restaurantContainer: {
    flex: 1,
    marginTop: 20,
  },
});
