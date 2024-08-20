import InputForm from "@components/InputForm";
import Navigation from "@components/Navigation";
import StarRating from "@components/StarRating";
import axios from "axios";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Slider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Filter() {
  const { token } = useLocalSearchParams();
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(25);
  const [rating, setRating] = useState(0);
  const [cuisine, setCuisine] = useState("");
  const [price, setPrice] = useState("");
  const [isPriceLow, setIsPriceLow] = useState(false);
  const [isPriceMedium, setIsPriceMedium] = useState(false);
  const [isPriceHigh, setIsPriceHigh] = useState(false);
  const [isPriceVeryHigh, setIsPriceVeryHigh] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Chinese", value: "chinese" },
    { label: "Japanese", value: "japanese" },
    { label: "Korean", value: "korean" },
    { label: "Thai", value: "thai" },
    { label: "Vietnamese", value: "vietnamese" },
    { label: "Indian", value: "indian" },
    { label: "Mexican", value: "mexican" },
    { label: "Italian", value: "italian" },
    { label: "French", value: "french" },
    { label: "Greek", value: "greek" },
    { label: "American", value: "american" },
  ]);

  const authRedirect = () => {
    router.dismissAll();
    router.replace("/"); 
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = {};
        const response = await axios.post("http://127.0.0.1:5000/verifyToken", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { missing_token, invalid_token, valid_token } = response.data;
        if (missing_token || invalid_token) {
          Alert.alert("Session Expired", "You will be redirected to the Login page", [{ text: "Continue", onPress: authRedirect }]);
        } else {
          console.log(token);
          console.log(valid_token);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    verifyToken();
  }, []);

  const updatePriceLow = (price: string) => {
    setPrice(price);
    setIsPriceLow(true);
    setIsPriceMedium(false);
    setIsPriceHigh(false);
  };
  const updatePriceMedium = (price: string) => {
    setPrice(price);
    setIsPriceMedium(true);
    setIsPriceHigh(false);
    setIsPriceLow(false);
  };
  const updatePriceHigh = (price: string) => {
    setPrice(price);
    setIsPriceHigh(true);
    setIsPriceMedium(false);
    setIsPriceLow(false);
    setIsPriceVeryHigh(false);
  };
  const updatePriceVeryHigh = (price: string) => {
    setPrice(price);
    setIsPriceVeryHigh(true);
    setIsPriceHigh(false);
    setIsPriceMedium(false);
    setIsPriceLow(false);
  };

  const postData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }
    const user_location = await Location.getCurrentPositionAsync({});
    const longitude = user_location["coords"]["longitude"];
    const latitude = user_location["coords"]["latitude"];
    router.replace({
      pathname: "(search)/filter_results",
      params: {
        token: token,
        longitude: longitude,
        latitude: latitude,
        location: location,
        distance: distance,
        cuisine: cuisine,
        rating: rating,
        price: price,
      },
    });
  };

  const resetFilters = () => {
    setLocation("");
    setDistance(25);
    setCuisine("");
    setRating(0);
    setPrice("");
    setIsPriceLow(false);
    setIsPriceMedium(false);
    setIsPriceHigh(false);
    setIsPriceVeryHigh(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.innerMain}>
          <View style={styles.navigation}>
            <Navigation rightIcon="times" rightNavigationOnPress={() => router.back()} />
          </View>
          <View style={styles.filters}>
            <View style={styles.locationContainer}>
              <Text style={styles.header}>Location</Text>
              <View style={styles.inputTextContainer}>
                <InputForm
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter location..."
                  autoCapitalize="words"
                  secureTextEntry={false}
                  searchInput={true}
                  fontSize={14}
                />
              </View>
              <View style={styles.sliderContainer}>
                <View style={styles.withinContainer}>
                  <Text style={styles.sliderText}>Within</Text>
                </View>
                <Slider
                  style={{ width: 190, height: 40 }}
                  minimumValue={1}
                  maximumValue={50}
                  value={distance}
                  minimumTrackTintColor="#D9D9D9"
                  maximumTrackTintColor="#D9D9D9"
                  thumbTintColor="#004643"
                  thumbStyle={styles.thumb}
                  onValueChange={(value) => {
                    setDistance(Math.round(value));
                  }}
                />
                <View style={styles.distanceContainer}>
                  <Text style={styles.sliderText}>{distance} km</Text>
                </View>
              </View>
            </View>
            <View style={styles.cuisineContainer}>
              <Text style={styles.header}>Type of Cuisine</Text>
              <View style={styles.dropdownPickerContainer}>
                <DropDownPicker
                  open={open}
                  value={cuisine}
                  items={items}
                  setOpen={setOpen}
                  setValue={setCuisine}
                  setItems={setItems}
                  placeholder={"Choose a cuisine..."}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  textStyle={styles.dropdownText}
                  theme="LIGHT"
                />
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.header}>Rating</Text>
              <View style={styles.stars}>
                <StarRating maxRating={5} onChangeValue={rating} onChange={setRating} size={48}/>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.header}>Price</Text>
              <View style={styles.innerPriceContainer}>
                <Pressable
                  style={[styles.individualPriceCategory, { backgroundColor: isPriceLow ? "#F3CC91" : "#FFFFFF" }]}
                  onPress={() => updatePriceLow("$")}
                >
                  <Text style={[styles.individualPriceText]}>$</Text>
                </Pressable>
                <Pressable
                  style={[styles.individualPriceCategory, { backgroundColor: isPriceMedium ? "#F3CC91" : "#FFFFFF" }]}
                  onPress={() => updatePriceMedium("$$")}
                >
                  <Text style={[styles.individualPriceText]}>$$</Text>
                </Pressable>
                <Pressable
                  style={[styles.individualPriceCategory, { backgroundColor: isPriceHigh ? "#F3CC91" : "#FFFFFF" }]}
                  onPress={() => updatePriceHigh("$$$")}
                >
                  <Text style={[styles.individualPriceText]}>$$$</Text>
                </Pressable>
                <Pressable
                  style={[styles.individualPriceCategory, { backgroundColor: isPriceVeryHigh ? "#F3CC91" : "#FFFFFF" }]}
                  onPress={() => updatePriceVeryHigh("$$$$")}
                >
                  <Text style={[styles.individualPriceText]}>$$$$</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.submitContainer}>
              <Pressable style={styles.resetContainer} onPress={resetFilters}>
                <Text style={styles.resetText}>Reset</Text>
              </Pressable>
              <Pressable style={styles.applyContainer} onPress={postData}>
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>
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
  navigation: {
    marginTop: 20,
  },
  filters: {
    flex: 1,
    justifyContent: "center",
  },
  locationContainer: {},
  header: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    color: "#004643",
  },
  inputTextContainer: {
    marginTop: 10,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 48,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: "space-around",
  },
  withinContainer: {
    width: 48,
    marginRight: 10,
    alignItems: "center",
  },
  distanceContainer: {
    width: 40,
    marginLeft: 10,
    alignItems: "center",
  },
  sliderText: {
    fontFamily: "Lato-Regular",
    color: "#004643",
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: "#004643",
  },
  cuisineContainer: {
    marginTop: 20,
    zIndex: 5,
  },
  cuisineArrayContainer: {
    marginTop: 10,
  },
  dropdownPickerContainer: {
    marginTop: 10,
  },
  dropdown: {
    height: 48,
    borderRadius: 12,
    borderColor: "#80A29E",
    color: "#004643",
    paddingLeft: 20,
    paddingRight: 20,
  },
  dropdownContainer: {
    borderRadius: 12,
    paddingLeft: 20,
    borderColor: "#80A29E",
  },
  dropdownText: {
    fontFamily: "Lato-Regular",
    color: "#004643",
  },
  ratingContainer: {
    marginTop: 20,
  },
  stars: {
    marginTop: 10,
  },
  priceContainer: {
    marginTop: 20,
  },
  innerPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 30,
    marginTop: 10,
  },
  individualPriceCategory: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    fontFamily: "Lato-Regular",
  },
  individualPriceText: {
    color: "#004643",
    fontFamily: "Lato-Bold",
  },
  submitContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  resetContainer: {
    backgroundColor: "#F3CC91",
    width: 142,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {
    color: "#004643",
    fontFamily: "Lato-SemiBold",
  },
  applyContainer: {
    backgroundColor: "#6F846E",
    width: 142,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  applyText: {
    color: "#FFFFFF",
    fontFamily: "Lato-SemiBold",
  },
});
