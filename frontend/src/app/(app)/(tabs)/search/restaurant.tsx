import Navigation from "@components/Navigation";
import { ReviewInfo } from "@components/ReviewInfo";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { FIREBASE_STORAGE } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, ImageBackground, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "src/context/SessionContext";

export default function Restaurant() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hoursNA, setHoursNA] = useState(true);
  const [hours24, setHours24] = useState(false);
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState("https://eldermoraes.com/wp-content/uploads/2023/05/placeholder.png");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [reviewsTotalInformation, setReviewsTotalInformation] = useState([]);
  const [savedRestaurants, setSavedRestaurants] = useState(false);
  const { restaurant_id } = useLocalSearchParams();
  const { onLogout } = useSession();

  useEffect(() => {
    fetchRestaurantData();
  }, [restaurant_id]);

  const fetchRestaurantData = async () => {
    try {
      await searchRestaurantDetails();
      await getReviews();
      await getUserSavedRestaurants();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      getDetailedReviews(reviews);
    }
  }, [reviewsLoaded]);

  const searchRestaurantDetails = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "/getRestaurantDetails";
      const current_day = new Date().getDay();
      const params = {
        restaurant_id: restaurant_id,
        current_day: current_day,
      };
      const response = await axios.get(server_url, { params });
      const {
        invalid_token,
        address,
        city,
        state,
        endTime,
        latitude,
        longitude,
        name,
        category,
        open,
        rating,
        startTime,
        hours_na,
        hours_24,
        price,
        imageURL,
      } = response.data.restaurant_details;
      if (invalid_token) {
        Alert.alert("Error", "Your session expired. Please log in again.");
        onLogout();
        router.replace("../../");
      } else {
        setAddress(`${address}, ${city} ${state}`);
        setEndTime(endTime);
        setLatitude(latitude);
        setLongitude(longitude);
        setName(name);
        setCategory(category);
        setOpen(open);
        setRating(rating);
        setStartTime(startTime);
        setHoursNA(hours_na);
        setHours24(hours_24);
        setPrice(price);
        setImageURL(imageURL);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getReviews = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "/getReviews";
      const params = {
        restaurant_id: restaurant_id,
      };
      const response = await axios.get(server_url, { params });
      const { invalid_token, reviews } = response.data;
      if (invalid_token) {
        Alert.alert("Error", "Your session expired. Please log in again.");
        onLogout();
        router.replace("../../");
      } else {
        setReviews(reviews);
        setReviewsLoaded(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserSavedRestaurants = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "/getSavedRestaurants";
      const response = await axios.get(server_url);
      const { invalid_token, saved_restaurants } = response.data;
      if (invalid_token) {
        Alert.alert("Error", "Your session expired. Please log in again.");
        onLogout();
        router.replace("../../");
      } else {
        setSavedRestaurants(saved_restaurants.includes(restaurant_id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveRestaurant = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL;
      const data = {
        restaurant_id: restaurant_id,
      };
      if (savedRestaurants) {
        setSavedRestaurants(false);
        const response = await axios.post(server_url + "/unsaveRestaurant", data);
        const { invalid_token } = response.data;
        if (invalid_token) {
          Alert.alert("Error", "Your session expired. Please log in again.");
          router.replace("../../");
        }
      } else {
        setSavedRestaurants(true);
        const response = await axios.post(server_url + "/saveRestaurant", data);
        const { invalid_token } = response.data;
        if (invalid_token) {
          Alert.alert("Error", "Your sesssion expired. Please log in again.");
          onLogout();
          router.replace("../../");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getDetailedReviews = async (reviews: any) => {
    const updatedReviews = await Promise.all(
      reviews.map(async (review: any) => {
        const image_urls = await getAllImages(review.review_id);
        const profile_picture = await getProfilePicture(review.user_id);
        const detailedUserInfo = await getDetailedUserInfo(review.user_id);
        return {
          review_id: review.review_id,
          user_id: review.user_id,
          review: review.review,
          rating: review.rating,
          images: image_urls,
          profile_picture: profile_picture,
          name: detailedUserInfo.name,
          review_total: detailedUserInfo.review_total,
          saved_total: detailedUserInfo.saved_total,
        };
      })
    );
    setReviewsTotalInformation(updatedReviews);
  };

  const getAllImages = async (review_id: string) => {
    try {
      const path_ref = ref(FIREBASE_STORAGE, `reviews/${review_id}`);
      const review_images = await listAll(path_ref);
      const { items } = review_images;
      const urls = await Promise.all(items.map((item) => getDownloadURL(item)));
      return urls;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getProfilePicture = async (user_id: string) => {
    try {
      const path_ref = ref(FIREBASE_STORAGE, `users/${user_id}.jpg`);
      const profile_picture = await getDownloadURL(path_ref);
      return profile_picture;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getDetailedUserInfo = async (user_id: string) => {
    try {
      const params = {
        user_id: user_id,
      };
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "/getDetailedUserInfo";
      const response = await axios.get(server_url, { params });
      const { invalid_token, user_info } = response.data;
      if (invalid_token) {
        Alert.alert("Error", "Your session expired. Please log in again.");
        onLogout();
        router.replace("../../");
      } else {
        return user_info;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        source={{
          uri: imageURL,
        }}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.backgroundImageContainer}>
          <Navigation
            leftIcon="arrow-left"
            leftNavigationOnPress={() => router.back()}
            middleIcon="note-edit-outline"
            middleNavigationOnPress={() => router.navigate({ pathname: "search/add-review", params: { restaurant_id: restaurant_id } })}
            rightIcon={savedRestaurants ? "heart" : "heart-outline"}
            rightNavigationOnPress={() => saveRestaurant()}
            color="#FFFFFF"
          />
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.restaurantInfoContainer}>
            <Text style={styles.restaurantName}>{name}</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <Icon name="star" type="material" color="#FF462D" size={16} />
                <Text style={styles.rating}>{rating.toFixed(1)}</Text>
                <Text style={styles.detailsText}>
                  {" "}
                  • {category} • {price ? price : "N/A"}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Icon name="clock-outline" type="material-community" color="#7F7E78" size={16} />
                {hoursNA ? (
                  <Text style={styles.detailsText}>Not Available</Text>
                ) : hours24 ? (
                  <Text style={styles.detailsText}>Open 24 hours</Text>
                ) : open ? (
                  <Text style={styles.detailsText}>
                    {startTime} - {endTime} Today
                  </Text>
                ) : (
                  <Text style={styles.detailsText}>Closed</Text>
                )}
              </View>
              <View style={styles.detailsRow}>
                <Icon name="location-pin" type="material" color="#7F7E78" size={16} />
                <Text style={styles.detailsText}>{address}</Text>
              </View>
            </View>
            <Pressable style={styles.directionContainer} onPress={openMaps}>
              <Image
                source={{
                  uri:
                    "https://maps.googleapis.com/maps/api/staticmap?center=" +
                    latitude +
                    "," +
                    longitude +
                    "&zoom=15&size=600x300&maptype=roadmap&markers=color:red|" +
                    latitude +
                    "," +
                    longitude +
                    "&key=" +
                    process.env.EXPO_PUBLIC_GOOGLE_KEY,
                }}
                style={styles.directionImage}
              />
            </Pressable>
          </View>
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsText}>Reviews</Text>
            {reviewsTotalInformation.length === 0 && <Text style={styles.detailsText}>No reviews so far. Add yours!</Text>}
            <FlatList
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              scrollEnabled={false}
              data={reviewsTotalInformation}
              keyExtractor={(item) => item.review_id}
              renderItem={({ item }) => <ReviewInfo {...item} />}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  backgroundImageContainer: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  contentContainer: {
    flex: 1,
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFFFF",
  },
  scrollContentContainer: {
    padding: 30,
  },
  restaurantInfoContainer: {
    flexDirection: "column",
    gap: 1,
  },
  restaurantName: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 24,
    color: "#1A1A1A",
  },
  detailsContainer: {
    paddingTop: 5,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  rating: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 14,
    color: "#FF462D",
  },
  detailsText: {
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 14,
    color: "#7F7E78",
  },
  directionContainer: {
    paddingTop: 15,
  },
  directionImage: {
    width: "100%",
    height: 175,
    borderRadius: 12,
  },
  reviewsText: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 20,
    color: "#1A1A1A",
  },
  reviewsContainer: {
    paddingTop: 15,
    gap: 10,
  },
});
