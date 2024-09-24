import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import { FIREBASE_STORAGE } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "src/context/SessionContext";

type ProfileInfo = {
  user_id: string;
  name: string;
  username: string;
  bio: string;
  saved_total: number;
};

type Review = {
  review_id: string;
  restaurant: {
    restaurant_id: string;
    restaurant_name: string;
    restaurant_image_url: string;
  };
  review: {
    picture_id: string;
    rating: number;
    review: string;
  };
};

export const Profile = () => {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState<ProfileInfo>();
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [url, setUrl] = useState<string | null>(
    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
  );
  const [refreshing, setRefreshing] = useState(false);
  const { onLogout } = useSession();

  useEffect(() => {
    fetchData();
    fetchReviews();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getUserInfo`);
      setProfile(data.user_info);
      const imageUrl = await getDownloadURL(ref(FIREBASE_STORAGE, `users/${data.user_info.user_id}.jpg`));
      setUrl(imageUrl);
      setLoaded(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getUserReviews`);
      setUserReviews(response.data.reviews);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => fetchReviews().then(() => setRefreshing(false)));
  };

  const generateFullStars = (rating: number, reviewId: string) => {
    const fullStars = Math.floor(rating);
    return Array.from({ length: fullStars }, (_, index) => (
      <View key={`star-${rating}-${index}`} style={styles.iconContainer}>
        <Icon name="star" type="font-awesome" color="#FFFFFF" size={14} />
      </View>
    ));
  };

  const removeReview = async (restaurant_id: string) => {
    try {
      const data = {
        "restaurant_id": restaurant_id,
      };
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getImageID`, { 
        params: {
        "restaurant_id": restaurant_id
      }});
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/removeReview`, data);
      const { picture_id } = response.data
      const folderRef = ref(FIREBASE_STORAGE, "reviews/" + restaurant_id + "/" + picture_id + "/");
      listAll(folderRef)
      .then((dir) => {
        dir.items.forEach((fileRef) => {
          const file = ref(FIREBASE_STORAGE, fileRef.fullPath);
          deleteObject(file)
            .then(() => {
              console.log("deleted:", fileRef.name);
            })
            .catch((e) => {
              console.log("Error deleting", fileRef.name, ":", e.message);
            });
        });
      })
      setUserReviews((prevReviews) => prevReviews.filter((review) => review.restaurant.restaurant_id !== restaurant_id));
    } catch (error) {
      console.error("Error removing review:", error.message);
    }
  };

  const renderProfileHeader = () => (
    <View style={{ paddingBottom: 10 }}>
      <Image source={{ uri: url }} style={styles.image} />
      <View style={{ paddingBottom: 15, gap: 5, paddingTop: 15 }}>
        <Text style={styles.fullName}>{profile.name}</Text>
        <Text style={styles.userName}>@{profile.username}</Text>
        <Text style={styles.userName}>{profile.bio || null}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.editProfile}
          onPress={() =>
            router.push({
              pathname: "profile/edit_profile",
              params: {
                id: profile.user_id,
                oldName: profile.name,
                oldBio: profile.bio,
                oldUsername: profile.username,
                oldImage: encodeURIComponent(url),
              },
            })
          }
        >
          <FontAwesome5 name="pencil-alt" size={12} color="#1A1A1A" />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={styles.logoutButton} onPress={onLogout}>
          <FontAwesome5 name="sign-out-alt" size={12} color="#1A1A1A" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      <Text style={styles.reviewHeader}>Reviews</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      {loaded && profile && (
        <FlatList
          data={userReviews}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer} key={item.review_id}>
              <View style={styles.reviewContent}>
                <Image source={{ uri: item.restaurant.restaurant_image_url }} style={styles.reviewImage} />
                <View style={styles.textContainer}>
                  <View style={styles.topContainer}>
                    <Text style={styles.restaurantName}>{item.restaurant.restaurant_name}</Text>
                    <Pressable onPress={() => removeReview(item.restaurant.restaurant_id)}>
                      <Icon name="close" type="material-community" size={24} color="#7F7E78" />
                    </Pressable>
                  </View>
                  <View style={styles.starsTimeContainer}>
                    <View style={styles.starsContainer}>{generateFullStars(item.review.rating, item.review_id)}</View>
                  </View>
                  <Text style={styles.reviewText}>{item.review.review}</Text>
                </View>
              </View>
              <View style={styles.divider}></View>
            </View>
          )}
          ListHeaderComponent={renderProfileHeader}
          ListEmptyComponent={<Text style={styles.noReviews}>No reviews yet</Text>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 55,
  },
  blankImage: {
    width: 90,
    height: 90,
  },
  fullName: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 20,
    color: "#1A1A1A",
  },
  userName: {
    fontFamily: "GT-America-Standard-Standard",
    fontSize: 14,
    color: "#1A1A1A",
  },
  reviewHeader: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 20,
    color: "#1A1A1A",
    marginTop: 20,
  },
  reviewContainer: {
    paddingTop: 20,
    borderRadius: 12,
  },
  reviewContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  reviewImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  restaurantName: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 16,
    color: "#1A1A1A",
  },
  reviewText: {
    fontFamily: "GT-America-Standard-Standard",
    fontSize: 14,
    color: "#1A1A1A",
  },
  starsTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  iconContainer: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    backgroundColor: "#FF462D",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  editProfile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
    paddingVertical: 10, // Reduced padding
    paddingHorizontal: 10, // Reduced padding
    gap: 5,
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
    paddingVertical: 10, // Reduced padding
    paddingHorizontal: 10, // Reduced padding
    gap: 5,
  },
  logoutText: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 14,
    color: "#1A1A1A",
  },
  editProfileText: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 14,
    color: "#1A1A1A",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0", // Divider color
  },
  noReviews: {
    fontFamily: "GT-America-Standard-Standard",
    fontSize: 14,
    color: "#7F7E78",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
