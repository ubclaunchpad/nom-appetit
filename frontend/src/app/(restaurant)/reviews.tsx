import Navigation from "@components/Navigation";
import RestaurantInfo from "@components/RestaurantInfo";
import { ReviewInfo } from "@components/ReviewInfo";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Review = {
  name: string;
  reviews: number;
  photos: number;
  rating: number;
  time: string;
  description: string;
  profilePicture: string;
};

const listReview: Review[] = [
  {
    name: "Bryan Taoaaaaaaaaasdasdasdasdaasdasdasdasdasdasdasdasdasdaasdasdasdasdsd",
    reviews: 10,
    photos: 5,
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Rafael Park",
    reviews: 10,
    photos: 5,
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Name",
    reviews: 10,
    photos: 5,
    rating: 4,
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Name",
    reviews: 10,
    photos: 5,
    rating: 4,
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
];

export default function Reviews() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.navigationContainer}>
          <Navigation
            leftIcon="arrow-left"
            leftNavigationOnPress={() => router.back()}
            rightIcon="home"
            rightNavigationOnPress={() =>
              router.navigate({
                pathname: "home",
                params: {
                  // token: token,
                },
              })
            }
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Reviews</Text>
        </View>
        <View style={[styles.restaurantContainer, { gap: 20 }]}>
          <FlatList data={listReview} renderItem={({ item }) => <ReviewInfo {...item} />} contentContainerStyle={{ gap: 20 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
  main: {
    flex: 1,
    marginHorizontal: 30
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
    // backgroundColor: "pink"
  },
  navigationContainer: {
    marginTop: 20,
    // backgroundColor: "pink"
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Lato",
    color: "#004643",
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3CC91",
    justifyContent: "center",
    alignItems: "center",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  individualCategory: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryText: {
    fontFamily: "Lato",
    color: "#004643",
  },
  restaurantContainer: {
    flex: 1,
  },
  restaurant: {
    backgroundColor: "white",
    width: "100%",
    height: 115,
    borderRadius: 12,
  },
});
