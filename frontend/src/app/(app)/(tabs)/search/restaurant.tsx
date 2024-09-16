import Navigation from "@components/Navigation";
import NavigatorTab from "@components/NavigatorTab";
import { ReviewInfo } from "@components/ReviewInfo";
import { ReviewInfoPreview } from "@components/ReviewInfoPreview";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { FIREBASE_STORAGE } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantDisplay() {
  // ===== restaurant details =====
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hoursNA, setHoursNA] = useState(true);
  const [hours24, setHours24] = useState(false);
  const [open, setOpen] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [imageURL, setImageURL] = useState("https://eldermoraes.com/wp-content/uploads/2023/05/placeholder.png");

  // ===== reviews =====
  const [reviews, setReviews] = useState([]);
  const [reviewsTotalInformation, setReviewsTotalInformation] = useState([]);
  // ===== local params =====
  const { restaurant_id } = useLocalSearchParams();

  // ===== functions =====
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        await searchRestaurantDetails();
        await getReviews();
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchRestaurantData();
  }, [restaurant_id]);

  useEffect(() => {
    if (reviews.length > 0) {
      getDetailedReviews(reviews);
    }
  }, [reviews]);

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
      const path_ref = ref(FIREBASE_STORAGE, `users/${user_id}`);
      const profile_picture = await getDownloadURL(path_ref);
      return profile_picture;
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
          date: review.date,
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

  const getDetailedUserInfo = async (user_id: string) => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "getDetailedUserInfo";
      const response = await axios.post(server_url);
      const { invalid_token, user_info } = response.data;
      if (invalid_token) {
        // TODO: logout alert
        router.replace("/");
      } else {
        return user_info;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getReviews = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "getReviews";
      const data = {
        restaurant_id: restaurant_id,
      };
      const response = await axios.post(server_url, data);
      const { invalid_token, reviews } = response.data;
      if (invalid_token) {
        router.replace("/");
      } else {
        // TODO: logout alert
        setReviews(reviews);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const searchRestaurantDetails = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "getRestaurantDetails";
      const data = {
        current_day: new Date().getDay(),
        restaurant_id: restaurant_id,
      };
      const response = await axios.post(server_url, data);
      const {
        invalid_token,
        address,
        city,
        endTime,
        imageURL,
        latitude,
        longitude,
        name,
        open,
        rating,
        startTime,
        state,
        hours_na,
        hours_24,
        category,
        price,
      } = response.data.restaurant_details;
      if (invalid_token) {
        // TODO: logout alert
        router.replace("/");
      } else {
        setAddress(`${address}, ${city} ${state}`);
        setEndTime(endTime);
        setLatitude(latitude);
        setLongitude(longitude);
        setName(name);
        setOpen(open);
        setRating(rating);
        setStartTime(startTime);
        setHoursNA(hours_na);
        setHours24(hours_24);
        setCategory(category);
        setPrice(price);
        setImageURL(imageURL);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log(reviewsTotalInformation);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: imageURL,
        }}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.backgroundImageContainer}>
          <View style={styles.navigationContainer}>
            <Navigation
              leftIcon="arrow-left"
              leftNavigationOnPress={() => router.back()}
              middleIcon="note-edit-outline"
              middleNavigationOnPress={() => router.navigate({ pathname: "search/add-review", params: { restaurant_id: restaurant_id } })}
              rightIcon="heart-outline"
              rightNavigationOnPress={() => router.navigate({ pathname: "/" })}
              color="#FFFEFA"
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.restaurantInfoContainer}>
            <Text style={styles.restaurant}>{name}</Text>
            <View style={[{ marginTop: 5 }, styles.detailsContainer]}>
              <View style={styles.iconContainer}>
                <Icon name="star" type="material" color="#FF462D" size={16} />
                <Text style={styles.rating}>{rating}</Text>
              </View>
              <Text style={styles.detailsText}>
                {" "}
                · {category} · {price}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.iconContainer}>
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
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.iconContainer}>
                <Icon name="location-pin" type="material" color="#7F7E78" size={16} />
                <Text style={styles.detailsText}>{address}</Text>
              </View>
            </View>
            <View style={styles.directionContainer}>
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
            </View>
          </View>
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviews}>Reviews</Text>
            <View style={styles.individualReviewsContainer}>
              <FlatList
                ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
                scrollEnabled={false}
                data={reviewsTotalInformation}
                renderItem={({ item }) => <ReviewInfo {...item} />}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: 275,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    marginTop: -25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFFFF",
  },
  scrollContentContainer: {
    marginHorizontal: 30,
    marginVertical: 30,
  },
  restaurantInfoContainer: {
    flexDirection: "column",
    gap: 1,
  },
  restaurant: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 24,
    color: "#1A1A1A",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  detailsText: {
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 14,
    color: "#7F7E78",
  },
  rating: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 14,
    color: "#FF462D",
  },
  directionContainer: {
    marginTop: 15,
  },
  directionImage: {
    width: "100%",
    height: 175,
    borderRadius: 12,
  },
  reviewsContainer: {
    marginTop: 15,
  },
  reviews: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 20,
    color: "#1A1A1A",
  },
  individualReviewsContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: "column",
    gap: 30,
    paddingBottom: 75,
  },
  backgroundImageContainer: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  navigationContainer: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  stars: {
    flexDirection: "row",
    gap: 5,
  },
  locationDetails: {
    marginTop: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  timeDetails: {
    marginTop: 2.5,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  locationText: {
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 14,
    color: "#7F7E78",
  },
  reviewsText: {
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 20,
    color: "#004643",
  },
  viewAllText: {
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 20,
    color: "#004643",
  },
  rightViewAll: {
    flexDirection: "row",
    alignItems: "center",
  },
});
