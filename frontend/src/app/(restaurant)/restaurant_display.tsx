import Navigation from "@components/Navigation";
import { ReviewInfoPreview } from "@components/ReviewInfoPreview";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantDisplay() {
  const [address, setAddress] = useState("2529 Alexander Street, Duncan BC");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [name, setName] = useState("McDonald's");
  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(4.5);
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("6:00 PM");
  const [imageURL, setImageURL] = useState("https://eldermoraes.com/wp-content/uploads/2023/05/placeholder.png");
  const { id, token } = useLocalSearchParams();
  const date = new Date();

  useEffect(() => {
    console.log(date.toLocaleString());
    const fetchData = async () => {
      try {
        const data = {
          current_day: date.getDay(),
          restaurant_id: id,
        };
        console.log(data);
        const response = await axios.post("http://127.0.0.1:5000/getRestaurantDetails", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { missing_token, invalid_token, address, city, endTime, imageURL, latitude, longitude, name, open, rating, startTime, state } =
          response.data.restaurant_details;
        if (missing_token || invalid_token) {
          Alert.alert("Session Expired", "You will be redirected to the Login page", [{ text: "Continue", onPress: () => router.navigate("/") }]);
        } else {
          console.log(token);
          setAddress(address + ", " + city + " " + state);
          setEndTime(endTime);
          setImageURL(imageURL);
          setLatitude(latitude);
          setLongitude(longitude);
          setName(name);
          setOpen(open);
          setRating(rating);
          setStartTime(startTime);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const truncateName = (name: string) => {
    if (name.length > 22) {
      return name.substring(0, 22 - 3) + "...";
    }
    return name;
  };

  const generateFullStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-star-${i}`} name="star" type="font-awesome" color="#F9BC60" size={20} />);
    }
    return stars;
  };

  const generateHalfStar = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = Number((rating - fullStars).toFixed(1));
    if (halfStar == 0.4 || halfStar == 0.5) {
      return <Icon name="star-half-o" type="font-awesome" color="#F9BC60" size={20} />;
    } else if (halfStar < 0.4) {
      return;
    } else if (halfStar > 0.5) {
      return <Icon name="star" type="font-awesome" color="#F9BC60" size={20} />;
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
              rightIcon="home"
              rightNavigationOnPress={() =>
                router.navigate({
                  pathname: "home",
                  params: {
                    token: token,
                  },
                })
              }
              color="#FFFEFA"
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Icon name="shoe-print" type="material-community" color="#FFFEFA" size={24} />
        </View>
        <View style={styles.button}>
          <Icon name="heart-outline" type="material-community" color="#FFFEFA" size={24} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.restaurantText}>{truncateName(name)}</Text>
            <View style={styles.stars}>
              {generateFullStars(rating)}
              {generateHalfStar(rating)}
            </View>
          </View>
          <View style={styles.locationContainer}>
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
              style={styles.locationImage}
            />
            <View style={styles.locationDetails}>
              <Icon name="location-pin" type="material" color="#7F7E78" size={18} />
              <Text style={styles.locationText}>{address}</Text>
            </View>
            <View style={styles.timeDetails}>
              <Icon name="clock-outline" type="material-community" color="#7F7E78" size={18} />
              {open ? (
                <Text style={styles.locationText}>
                  {startTime} - {endTime}
                </Text>
              ) : (
                <Text style={styles.locationText}>Closed</Text>
              )}
            </View>
          </View>
          <View style={styles.reviewsContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.reviewsText}>Reviews</Text>
              <Pressable style={styles.rightViewAll} onPress={() => router.push('(restaurant)/reviews')}>
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="chevron-forward-outline" type="ionicon" color={"#004643"} size={20} />
              </Pressable>
            </View>
            <View style={styles.individualReviewsContainer}>
              <ReviewInfoPreview {...boilerReview} />
              <ReviewInfoPreview {...boilerReview} />
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
    height: 350,
    resizeMode: "contain",
  },
  backgroundImageContainer: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  navigationContainer: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  buttonsContainer: {
    zIndex: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    marginTop: -125,
    gap: 10,
  },
  button: {
    backgroundColor: "#004643",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  stars: {
    flexDirection: "row",
    gap: 5,
  },
  contentContainer: {
    flex: 1,
    marginTop: -25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFEFA",
  },
  scrollContentContainer: {
    marginHorizontal: 30,
    marginVertical: 45,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantText: {
    fontFamily: "Lato-SemiBold",
    fontSize: 20,
    color: "#004643",
  },
  locationContainer: {
    marginTop: 15,
  },
  locationImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#6F846E",
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
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#7F7E78",
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsText: {
    fontFamily: "Lato-SemiBold",
    fontSize: 20,
    color: "#004643",
  },
  viewAllText: {
    fontFamily: "Lato-SemiBold",
    fontSize: 20,
    color: "#004643",
  },
  rightViewAll: {
    flexDirection: "row",
    alignItems: "center",
  },
  individualReviewsContainer: {
    marginTop: 15,
    flexDirection: "column",
    gap: 15,
  },
});
