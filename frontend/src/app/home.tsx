import Images from "@assets/images";
import HomeButton from "@components/HomeButton";
import HomeProfile from "@components/HomeProfile";
import InputForm from "@components/InputForm";
import axios from "axios";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const { token } = useLocalSearchParams();

  const authRedirect = () => {
    router.dismissAll();
    router.replace("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/home", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { missing_token, invalid_token, name } = response.data;
        if (missing_token || invalid_token) {
          Alert.alert(
            "Session Expired",
            "You will be redirected to the Login page",
            [{ text: "Continue", onPress: authRedirect }]
          );
        } else {
          console.log(token);
          setName(name);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const searchRestaurant = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        setSearchText("");
      }
      const location = await Location.getCurrentPositionAsync({});
      const longitude = location["coords"]["longitude"];
      const latitude = location["coords"]["latitude"];
      router.push({
        pathname: "(search)/search",
        params: {
          token: token,
          longitude: longitude,
          latitude: latitude,
          initialSearchText: searchText.replace(/’/, ""),
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.innerMain}>
          <View style={styles.profileContainer}>
            <HomeProfile
              name={name}
              notifcationCount={3}
              profilePicture="https://randomuser.me/api/portraits/men/41.jpg"
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>What would you like to eat?</Text>
          </View>
          <View style={styles.searchContainer}>
            <InputForm
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search for a restaurant..."
              autoCapitalize="words"
              secureTextEntry={false}
              searchInput={true}
              onSubmitEditing={searchRestaurant}
            />
          </View>
          <View style={styles.buttonContainer}>
            <HomeButton
              onPress={() => router.push("(profile)/saved_restaurants")}
              headerText="Saved Restaurants"
              icon="heart"
            />
            <HomeButton
              onPress={() => {}}
              headerText="Give me suggestions"
              icon="lightbulb-on"
            />
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={Images.bambooFull} style={styles.image} />
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
    width: "100%",
  },
  innerMain: {
    marginHorizontal: 30,
  },
  profileContainer: {
    marginTop: 20,
  },
  headerContainer: {
    marginTop: 125,
  },
  headerText: {
    fontFamily: "Lato-SemiBold",
    fontSize: 20,
    color: "#004643",
    textAlign: "center",
  },
  searchContainer: {
    marginTop: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  imageContainer: {
    position: "absolute",
    bottom: -175,
    zIndex: -1,
  },
  image: {
    width: 400,
    height: 400,
  },
});
