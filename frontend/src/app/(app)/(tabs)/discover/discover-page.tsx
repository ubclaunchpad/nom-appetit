import InputForm from "@components/InputForm";
import RestaurantInfo from "@components/RestaurantInfo";
import axios from "axios";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "src/context/SessionContext";

export default function SearchPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { onLogout } = useSession();
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getSavedRestaurants();
  }, []);

  const getSavedRestaurants = async () => {
    try {
      const params = {
        refresh_status: refreshing,
      };
      const response = await axios.post(process.env.EXPO_PUBLIC_SERVER_URL + "/getUserRecommendations", { params });
      const { invalid_token, error, restaurants } = response.data;
      if (invalid_token) {
        Alert.alert("Error", "Your session expired. Please log in again.");
        onLogout();
        router.replace("../../");
      } else {
        if (error == "NOT_ENOUGH_REVIEWS") {
          setErrorStatus(true);
          setErrorMessage(
            "It seems you haven’t submitted enough reviews for personalized recommendations. Start sharing your ratings to unlock tailored suggestions! ☺"
          );
        } else {
          setRestaurants(restaurants);
        }
      }
    } catch (error) {
      Alert.alert(error);
    } finally {
      setRefreshing(false); // Ensure refreshing is stopped in the end
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const timeout = setTimeout(() => {
      getSavedRestaurants();
    }, 2000);
  }, []);

  return (
    <View style={styles.main}>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.searchContainer}>
        <Text style={styles.headerText}>Discover</Text>
      </SafeAreaView>
      {errorStatus ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <View style={styles.restaurantContainer}>
          <FlatList
            data={restaurants}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) => (
              <RestaurantInfo
                restaurant_id={item.restaurant_id}
                name={item.name}
                coordinates={item.coordinates}
                location={item.location}
                isDistance={false}
                distance={item.distance}
                image_url={item.image_url}
                price={item.price}
                business_hours={item.business_hours}
                categories={item.categories}
                rating={item.rating}
                saved={item.saved}
                path={"saved"}
              />
            )}
          />
        </View>
      )}
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
  headerText: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 24,
    color: "#1A1A1A",
  },
  errorMessage: {
    fontFamily: "GT-America-Standard-Standard",
    fontSize: 14,
    color: "#7F7E78",
    marginTop: 10
  }
});
