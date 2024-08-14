import Images from "@assets/images";
import FilterPressable from "@components/FilterPressable";
import InputForm from "@components/InputForm";
import Navigation from "@components/Navigation";
import RestaurantInfo from "@components/RestaurantInfo";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { token, longitude, latitude, location, distance, cuisine, rating, price } = useLocalSearchParams();
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filterKeyArray, setFilterKeyArray] = useState([]);
  const initialFilterCount = [location, distance, cuisine, rating, price].filter((item) => item !== "").length
  const locationTitle = location as string;
  const distanceTitle = "Within " + (distance as string) + "km";
  const cuisineTitle = cuisine ? cuisine[0].toUpperCase() + cuisine.slice(1) : "";
  const ratingTitle = parseInt(rating as string) != 0 ? "Greater than " + (rating as string) + " stars" : "";
  const priceTitle = price as string;

  const searchRestaurants = async () => {
    try {
      const data = {
        longitude: longitude,
        latitude: latitude,
        keywords: searchText,
      };
      const response = await axios.post("http://127.0.0.1:5000/searchRestaurants", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { missing_token, invalid_token, restaurants } = response.data;
      if (missing_token || invalid_token) {
        Alert.alert("Session Expired", "You will be redirected to the Login page", [{ text: "Continue", onPress: () => router.push("/") }]);
      } else {
        console.log(token);
        setRestaurants(restaurants);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const reducedFilterSearch = async (key: string) => {
    try {
      const body = {
        longitude: longitude,
        latitude: latitude,
        location: location,
        distance: distance,
        cuisine: cuisine,
        rating: rating,
        price: price,
      };
      const updatedFilterKeyArray = [...filterKeyArray, key];
      setFilterKeyArray(updatedFilterKeyArray);
      for (const selectedKey of updatedFilterKeyArray) {
        console.log(selectedKey);
        delete body[selectedKey];
      }
      console.log(body);
      const response = await axios.post("http://127.0.0.1:5000/filterSearchRestaurants", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { missing_token, invalid_token, restaurants } = response.data;
      if (missing_token || invalid_token) {
        Alert.alert("Session Expired", "You will be redirected to the Login page", [{ text: "Continue", onPress: () => router.push("/") }]);
      } else {
        console.log(token);
        setRestaurants(restaurants);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          longitude: longitude,
          latitude: latitude,
          location: location,
          distance: distance,
          cuisine: cuisine,
          rating: rating,
          price: price,
        };
        const response = await axios.post("http://127.0.0.1:5000/filterSearchRestaurants", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { missing_token, invalid_token, restaurants } = response.data;
        if (missing_token || invalid_token) {
          Alert.alert("Session Expired", "You will be redirected to the Login page", [{ text: "Continue", onPress: () => router.push("/") }]);
        } else {
          console.log(token);
          setRestaurants(restaurants);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.innerMain}>
          <View style={styles.navigationContainer}>
            <Navigation
              leftIcon="arrow-left"
              leftNavigationOnPress={() => router.back()}
              rightIcon="home"
              rightNavigationOnPress={() =>
                router.navigate({
                  pathname: "home",
                  params: {
                    token: token,
                  },
                })
              }
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Search Results</Text>
            <Image source={Images.pandaPizza} style={styles.image} />
          </View>
          <View style={styles.searchContainer}>
            <InputForm
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search for a restaurant..."
              autoCapitalize="none"
              secureTextEntry={false}
              searchInput={true}
              width={"82%"}
              onSubmitEditing={searchRestaurants}
            />
            <Pressable style={styles.filterButton} onPress={() => router.push("(search)/filter")}>
              <Icon name="filter" type="font-awesome" color="#004643" size={25} />
            </Pressable>
          </View>
          {filterKeyArray.length !== initialFilterCount && (
            <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
              <View style={styles.categories}>
                <FilterPressable filter={locationTitle} title={"location"} filterFunction={reducedFilterSearch} />
                <FilterPressable filter={distanceTitle} title={"distance"} filterFunction={reducedFilterSearch} />
                <FilterPressable filter={cuisineTitle} title={"cuisine"} filterFunction={reducedFilterSearch} />
                <FilterPressable filter={ratingTitle} title={"rating"} filterFunction={reducedFilterSearch} />
                <FilterPressable filter={priceTitle} title={"price"} filterFunction={reducedFilterSearch} />
              </View>
            </ScrollView>
          )}
          <View style={styles.restaurantContainer}>
            <FlatList
              data={restaurants}
              renderItem={({ item }) => (
                <RestaurantInfo
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  rating={item.rating}
                  distance={item.distance}
                  image_url={item.image_url}
                />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
  main: {
    flex: 1,
    width: "100%",
  },
  innerMain: {
    flex: 1,
    marginHorizontal: 30,
  },
  navigationContainer: {
    marginTop: 20,
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Lato",
    color: "#004643",
    marginRight: 7,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3CC91",
  },
  categoriesContainer: {
    marginTop: 15,
    height: 36,
    flexGrow: 0,
  },
  categories: {
    flexDirection: "row",
  },
  restaurantContainer: {
    flex: 1,
    marginTop: 15,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
