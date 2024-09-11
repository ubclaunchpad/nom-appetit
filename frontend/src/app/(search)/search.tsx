import Images from "@assets/images";
import InputForm from "@components/InputForm";
import Navigation from "@components/Navigation";
import RestaurantInfo from "@components/RestaurantInfo";
import RestaurantSearchFilter from "@components/RestaurantSearchFilter";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { token, longitude, latitude, initialSearchText } =
    useLocalSearchParams();
  const [searchText, setSearchText] = useState(initialSearchText as string);
  const [restaurants, setRestaurants] = useState([]);
  const [popularIsPressed, setPopularIsPressed] = useState(true);
  const [recentlyViewedIsPressed, setRecentlyViewedIsPressed] = useState(false);
  const [nearYouIsPressed, setNearYouIsPressed] = useState(false);

  const authRedirect = () => {
    router.dismissAll();
    router.replace("/");
  };

  const searchRestaurants = async (textVariable: string) => {
    try {
      const cleanedText = textVariable.replace(/’/, "");
      const data = {
        longitude: longitude,
        latitude: latitude,
        keywords: cleanedText,
      };
      console.log(data);
      const response = await axios.post(
        "http://127.0.0.1:5000/searchRestaurants",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { missing_token, invalid_token, restaurants } = response.data;
      if (missing_token || invalid_token) {
        Alert.alert(
          "Session Expired",
          "You will be redirected to the Login page",
          [{ text: "Continue", onPress: authRedirect }]
        );
      } else {
        console.log(token);
        setRestaurants(restaurants);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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

  useEffect(() => {
    searchRestaurants(initialSearchText as string);
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
              onSubmitEditing={() => searchRestaurants(searchText as string)}
            />
            <Pressable
              style={styles.filterButton}
              onPress={() =>
                router.push({
                  pathname: "(search)/filter",
                  params: {
                    token: token,
                  },
                })
              }
            >
              <Icon
                name="filter"
                type="font-awesome"
                color="#004643"
                size={25}
              />
            </Pressable>
          </View>
          <View style={styles.categories}>
            <RestaurantSearchFilter
              buttonPressed={popularIsPressed}
              handleButton={handlePopular}
              text="Popular"
            />
            <RestaurantSearchFilter
              buttonPressed={recentlyViewedIsPressed}
              handleButton={handleRecentlyViewed}
              text="Recently Viewed"
            />
            <RestaurantSearchFilter
              buttonPressed={nearYouIsPressed}
              handleButton={handleNearYou}
              text="Near You"
            />
          </View>
          <View style={styles.restaurantContainer}>
            <FlatList
              data={restaurants}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "(restaurant)/restaurant_display",
                      params: {
                        token: token,
                        id: item.id,
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
                  />
                </Pressable>
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
    marginRight: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3CC91",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  restaurantContainer: {
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});
