import Images from "@assets/images";
import Navigation from "@components/Navigation";
import { ReviewInfo } from "@components/ReviewInfo";
import { ReviewInfoPreview } from "@components/ReviewInfoPreview";
import StarRating from "@components/StarRating";
import axios from "axios";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Pressable } from "react-native";
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantDisplay() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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

  const generateFullStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`full-star-${i}`}
          name="star"
          type="font-awesome"
          color="#F9BC60"
          size={16}
        />
      );
    }
    return stars;
  };

  const generateHalfStar = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = Number((rating - fullStars).toFixed(1));
    if (halfStar == 0.4 || halfStar == 0.5) {
      return (
        <Icon
          name="star-half-o"
          type="font-awesome"
          color="#F9BC60"
          size={16}
        />
      );
    } else if (halfStar < 0.4) {
      return;
    } else if (halfStar > 0.5) {
      return <Icon name="star" type="font-awesome" color="#F9BC60" size={16} />;
    }
  };

  // =====
  const [location, setLocation] = useState("45 W 17 St, Vancouver, BC");
  const [times, setTimes] = useState("10am - 9pm");
  type dish = {
    name: string;
    description: string;
    image: ImageSourcePropType;
  };
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
  const featuredDishes: dish[] = [
    {
      name: "Poke",
      description: "Description",
      image: Images.dummyFood1,
    },
    {
      name: "Bento Box",
      description: "Description",
      image: Images.dummyFood2,
    },
    {
      name: "Salmon",
      description: "Description",
      image: Images.dummyFood2,
    },
  ];
  // =====

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: imageURL,
        }}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.headerSafeContainer}>
          <View style={styles.headerContainer}>
            <Navigation leftIcon="arrow-left" rightIcon="home" color="#FFFEFA" />
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
      <View style={styles.scrollableContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantText}>{name}</Text>
            <View style={styles.stars}>
            {generateFullStars(rating)}
            {generateHalfStar(rating)}
            </View>
          </View>
          <View style={styles.location}>
            <Image
              source={{
                uri: "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=15&size=600x300&maptype=roadmap&markers=color:red|" + latitude + "," + longitude + "&key=" + process.env.EXPO_PUBLIC_GOOGLE_KEY,
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
          <View>
            {/* <View style={styles.spacedHeader}>
              <Text style={styles.headerText}>Popular Dishes</Text>
              <Pressable style={styles.rightViewAll}>
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="chevron-forward-outline" type="ionicon" color={"#004643"} size={20} />
              </Pressable>
            </View>
            <View style={styles.featuredDishes}>
              {featuredDishes.map((dish, i) => {
                return (
                  <View key={i} style={styles.featuredDish}>
                    <Image source={dish.image} style={styles.image} />
                    <View style={styles.dishTextContainer}>
                      <Text style={styles.dishName}>{dish.name}</Text>
                      <Text numberOfLines={1} style={styles.dishDescription}>
                        {dish.description}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View> */}
            <View style={styles.spacedHeader}>
              <Text style={styles.headerText}>Reviews</Text>
              <Pressable style={styles.rightViewAll}>
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="chevron-forward-outline" type="ionicon" color={"#004643"} size={20} />
              </Pressable>
            </View>
            <View style={styles.reviewContainer}>
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
  headerSafeContainer: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  headerContainer: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  buttonsContainer: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    marginTop: -125,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#004643",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginLeft: 10,
  },
  scrollableContainer: {
    flex: 1,
    marginTop: -25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFEFA",
  },
  scrollContentContainer: {
    paddingHorizontal: 30,
    paddingTop: 45,
  },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantText: {
    fontFamily: "Lato",
    fontWeight: "600",
    fontSize: 20,
    color: "#004643",
  },
  location: {
    marginTop: 20,
  },
  locationImage: {
    width: "100%",
    height: 150,
    backgroundColor: "red",
    marginVertical: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#6F846E"
  },
  locationDetails: {
    marginTop: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  timeDetails: {
    marginTop: 2,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#7F7E78",
  },
  spacedHeader: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    color: "#004643",
  },
  viewAllText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: "#004643",
  },
  rightViewAll: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredDishes: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  featuredDish: {
    alignItems: "center",
  },
  dishTextContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  dishName: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    color: "#004643",
  },
  dishDescription: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 10,
    color: "#004643",
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 12,
  },
  reviewContainer: {
    marginTop: 10,
    marginBottom: 45,
  },
});
