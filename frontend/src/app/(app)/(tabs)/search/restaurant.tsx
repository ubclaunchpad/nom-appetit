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
  const { restaurant_id } = useLocalSearchParams();
  const [reviews, setReviews] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const [businessHours, setBusinessHours] = useState([]);
  const [categories, setCategories] = useState([
    {
      alias: "",
      title: "",
    },
  ]);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [restaurantName, setRestaurantName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://eldermoraes.com/wp-content/uploads/2023/05/placeholder.png");
  const [location, setLocation] = useState({
    address1: "",
    address2: "",
    address3: "",
    city: "",
    country: "",
    cross_streets: "",
    display_address: [],
    state: "",
    zip_code: "",
  });
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);

  const { onLogout } = useSession();

  useEffect(() => {
    getSavedStatus();
    getRestaurantDetails();
    getAllReviews();
  }, []);

  const getSavedStatus = async () => {
    const data = {
      "restaurant_id": restaurant_id
    };
    const response = await axios.post(process.env.EXPO_PUBLIC_SERVER_URL + "/getSavedStatus", data);
    const { saved } = response.data 
    setIsSaved(saved)
  };

  const getRestaurantDetails = async () => {
    try {
      const params = {
        restaurant_id: restaurant_id,
      };
      const response = await axios.get(process.env.EXPO_PUBLIC_SERVER_URL + "/getRestaurantDetails", { params });
      const { invalid_token, restaurant_details } = response.data;

      if (invalid_token) {
        Alert.alert("Error", "Your session expired. Please log in again.");
        onLogout();
        router.replace("../../");
      } else {
        const { business_hours, categories, coordinates, name, image_url, location, price, rating } = restaurant_details;
        setBusinessHours(business_hours);
        setCategories(categories);
        setCoordinates({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });
        setRestaurantName(name);
        setImageUrl(image_url);
        setLocation(location);
        setPrice(price);
        setRating(rating.toFixed(1));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAllReviews = async () => {
    try {
      const params = {
        restaurant_id: restaurant_id,
      };
      const response = await axios.get(process.env.EXPO_PUBLIC_SERVER_URL + "/getAllReviews", { params });
      const { invalid_token, reviews } = response.data;
      if (invalid_token) {
        Alert.alert("Error", "Your session expired. Please log in again.");
        onLogout();
        router.replace("../../");
      } else {
        const updatedReviews = [];
        for (const review of reviews) {
          // get all review images
          const picture_id = review["picture_id"];
          const user_id = review["user_id"];
          const review_images_ref = ref(FIREBASE_STORAGE, `reviews/${restaurant_id}/${picture_id}`);
          const review_images = await listAll(review_images_ref);
          const { items } = review_images;
          const image_urls = await Promise.all(items.map((item) => getDownloadURL(item)));
          review["image_urls"] = image_urls;
          // get profile picture
          const profile_picture_ref = ref(FIREBASE_STORAGE, `users/${user_id}.jpg`);
          const profile_picture = await getDownloadURL(profile_picture_ref);
          review["profile_picture"] = profile_picture;
          // get user info
          const params = {
            "user_id": user_id
          }
          const response = await axios.get(process.env.EXPO_PUBLIC_SERVER_URL + "/getOtherUserInfo", { params });
          const { invalid_token, user_info } = response.data;
          if (invalid_token) {
            Alert.alert("Error", "Your session expired. Please log in again.");
            onLogout();
            router.replace("../../");
          } else {
            review["user_name"] = user_info["name"];
            review["user_total_reviews"] = user_info["reviews"].length;
            review["user_total_saved"] = user_info["saved"].length;
          }
          updatedReviews.push(review);
        }
        setReviews(updatedReviews);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${coordinates["latitude"]},${coordinates["longitude"]}`,
      android: `geo:0,0?q=${coordinates["latitude"]},${coordinates["longitude"]}`,
    });
    Linking.openURL(url);
  };

  const saveRestaurant = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL;
      // do the opposite of what is current so since it is save, now unsave
      setIsSaved(false);
      if (isSaved) {
        const data = {
          restaurant_id: restaurant_id,
        };
        const response = await axios.post(server_url + "/unsaveRestaurant", data);
        const { invalid_token } = response.data;
        if (invalid_token) {
          Alert.alert("Error", "Your token expired. Please log in again.");
          router.replace("../../");
        }
      } else {
        // it is not saved yet, so now we save
        setIsSaved(true);
        const data = {
          restaurant_id: restaurant_id,
          name: restaurantName,
          coordinates: coordinates,
          location: location,
          image_url: imageUrl,
          price: price,
          business_hours: businessHours,
          categories: categories,
          rating: rating as number,
          saved: true,
        };
        const response = await axios.post(server_url + "/saveRestaurant", data);
        const { invalid_token } = response.data;
        if (invalid_token) {
          Alert.alert("Error", "Your token expired. Please log in again.");
          router.replace("../../");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        source={{
          uri: imageUrl,
        }}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.backgroundImageContainer}>
          <Navigation
            leftIcon="arrow-left"
            leftNavigationOnPress={() => router.back()}
            middleIcon="note-edit-outline"
            middleNavigationOnPress={() =>
              router.push({
                pathname: "search/add-review",
                params: {
                  restaurant_id: restaurant_id,
                  name: restaurantName,
                  image_url: imageUrl,
                },
              })
            }
            rightIcon={isSaved ? "heart" : "heart-outline"}
            rightNavigationOnPress={() => saveRestaurant()}
            color="#FFFFFF"
          />
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.restaurantInfoContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <Icon name="star" type="material" color="#FF462D" size={16} />
                <Text style={styles.rating}>{rating}</Text>
                <Text style={styles.detailsText}>
                  {" "}
                  • {categories[0]["title"]} • {price}
                </Text>
              </View>
              {/* <View style={styles.detailsRow}>
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
              </View> */}
              <View style={styles.detailsRow}>
                <Icon name="location-pin" type="material" color="#7F7E78" size={16} />
                <Text style={styles.detailsText}>
                  {location["address1"]}, {location["city"]}
                </Text>
              </View>
            </View>
            <Pressable style={styles.directionContainer} onPress={openMaps}>
              <Image
                source={{
                  uri:
                    "https://maps.googleapis.com/maps/api/staticmap?center=" +
                    coordinates["latitude"] +
                    "," +
                    coordinates["longitude"] +
                    "&zoom=15&size=600x300&maptype=roadmap&markers=color:red|" +
                    coordinates["latitude"] +
                    "," +
                    coordinates["longitude"] +
                    "&key=" +
                    process.env.EXPO_PUBLIC_GOOGLE_KEY,
                }}
                style={styles.directionImage}
              />
            </Pressable>
          </View>
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsText}>Reviews</Text>
            {reviews.length === 0 && <Text style={styles.detailsText}>No reviews so far. Add yours!</Text>}
            <FlatList
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              scrollEnabled={false}
              data={reviews}
              renderItem={({ item }) => (
                <ReviewInfo
                  user_id={item.user_id}
                  user_name={item.user_name}
                  user_total_reviews={item.user_total_reviews}
                  user_total_saved={item.user_total_saved}
                  review={item.review}
                  rating={item.rating}
                  profile_picture={item.profile_picture}
                  picture_id={item.picture_id}
                  image_urls={item.image_urls}
                />
              )}
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
    paddingBottom: 5,
  },
  reviewsContainer: {
    paddingTop: 15,
    gap: 5,
  },
});
