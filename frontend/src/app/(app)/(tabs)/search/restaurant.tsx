import Navigation from "@components/Navigation";
import NavigatorTab from "@components/NavigatorTab";
import { ReviewInfo } from "@components/ReviewInfo";
import { ReviewInfoPreview } from "@components/ReviewInfoPreview";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { FIREBASE_STORAGE } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

interface Review {
  rating: number;
  review_id: string;
  review: string;
  user_id: string;
}

export default function RestaurantDisplay() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hoursNA, setHoursNA] = useState(true);
  const [hours24, setHours24] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [imageURL, setImageURL] = useState("https://eldermoraes.com/wp-content/uploads/2023/05/placeholder.png");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { id } = useLocalSearchParams();
  const date = new Date();
  const test = []

  useEffect(() => {
    searchRestaurantDetails();
    getReviews();
    for (const review of reviews) {
      const review_id = review.review_id;
      console.log(review_id)
    }
  }, []);

  const getAllImages = async (review_id: string) => {
    try {
      const path_ref = ref(FIREBASE_STORAGE, `reviews/${review_id}`);
      const review_images = await listAll(path_ref)
      const { items } = review_images;
      const urls = await Promise.all(
        items.map((item) => getDownloadURL(item))
      );
      setImageUrls(urls);
    } catch {
      console.error("Error getting images")
    }
  }

  console.log(test)

  const getReviews = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "getReviews";
      const data = {
        restaurant_id: id,
      };
      const response = await axios.post(server_url, data);
      const { reviews } = response.data;
      setReviews(reviews);
    } catch (error) {
      console.error(error.message);
    }
  }

  const searchRestaurantDetails = async () => {
    try {
      const server_url = process.env.EXPO_PUBLIC_SERVER_URL + "getRestaurantDetails";
      const data = {
        current_day: date.getDay(),
        restaurant_id: id,
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
        router.replace("/");
      } else {
        setAddress(address + ", " + city + " " + state);
        setEndTime(endTime);
        setImageURL(imageURL);
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
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // =====
  const boilerReview = {
    name: "Bryan Tao",
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    reviews: 10,
    photos: 5,
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  };
  // =====

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
              middleNavigationOnPress={() => router.navigate({ pathname: "search/add-review", params: {"restaurant_id": id}},)}
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
                <Icon name="location-pin" type="material" color="#7F7E78" size={16} />
                <Text style={styles.detailsText}>{address}</Text>
              </View>
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
          <Image source={imageUrls[0]}></Image>
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviews}>Reviews</Text>
            <View style={styles.individualReviewsContainer}>
              {/* <ReviewInfo {...boilerReview} /> */}
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
    marginBottom: 20,
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
    marginTop: 10,
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
