import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Button,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { Badge } from "@rneui/themed";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Navigation from "@components/Navigation";
import { ReviewInfo } from "@components/ReviewInfo";

import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { FIREBASE_STORAGE } from "firebaseConfig";

type profile_info = {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  reviews: string[];
  review_total: number;
  saved: string[];
  saved_total: number;
};

type Review = {
  rating: number;
  restaurant_id: string;
  review: string;
  review_id: string;
  user_id: string;
  images: string[];
};

export const Profile = () => {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState<profile_info>();
  const [reviewInformation, setReviewInformation] = useState<Review[]>([]);
  const [url, setUrl] = useState(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["37.5%", "90%"], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          process.env.EXPO_PUBLIC_SERVER_URL + "/getCurrentUserInfo"
        );

        await addImageUrls(data["current_user_reviews"]);
        await getDownloadURL(
          ref(FIREBASE_STORAGE, `users/${data["current_user_info"].id}.jpg`)
        )
          .then((url) => setUrl(url))
          .catch((e) => setUrl(null));

        setProfile(data["current_user_info"]);
        setLoaded(true);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [loaded]);

  console.log(reviewInformation);

  const addImageUrls = async (reviews: Review[]) => {
    await Promise.all(
      reviews.map(async (review) => {
        review.images = await getAllImages(review.review_id);
      })
    );

    setReviewInformation(reviews);
  };

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef, loaded]);

  console.log(reviewInformation);

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

  return (
    <>
      {loaded && (
        <SafeAreaView style={styles.containerBackground}>
          <View style={styles.imageBackground}>
            {url ? (
              <>
                <Image source={{ uri: url }} style={styles.image} />
              </>
            ) : (
              <>
                <FontAwesome name="user" size={52} color="white" />
              </>
            )}
          </View>
          <Text style={styles.fullName}>{profile.name}</Text>
          <Text style={styles.userName}>{profile.username}</Text>
          <Text>{profile.bio}</Text>
          <View style={styles.infoBox}>
            <Pressable
              onPress={() => router.push("collection/saved_restaurants")}
            >
              <View style={styles.innerInfoBox}>
                <Text style={{ fontSize: 16 }}>Saved Restaurants</Text>
                <Text style={styles.profileStat}>{profile.saved_total}</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.buttonMenu}>
            <Pressable
              style={styles.editProfile}
              onPress={() => {
                router.push({
                  pathname: "profile/edit_profile",
                  params: {
                    oldName: profile.name,
                    oldBio: profile.bio,
                    oldUsername: profile.username,
                  },
                });
              }}
            >
              <FontAwesome5 name="pencil-alt" size={14} color="#004643" />
              <Text style={{ color: "#004643" }}>Edit Profile</Text>
            </Pressable>
          </View>
          <BottomSheetModalProvider>
            <View style={{ backgroundColor: "white" }}>
              <BottomSheetModal
                enablePanDownToClose={false}
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
              >
                <BottomSheetView style={styles.bottomSheetContainer}>
                  <Text style={styles.bottomSheetHeader}>
                    My Reviews ({profile.review_total})
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    <FlatList
                      data={reviewInformation}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "#6F846E8F",
                            borderRadius: 12,
                            marginBottom: 15,
                          }}
                        >
                          <ReviewInfo
                            review_id={item.review_id}
                            user_id={profile.id}
                            review={item.review}
                            rating={item.rating}
                            images={item.images}
                            profile_picture={url}
                            name={profile.name}
                            review_total={profile.review_total}
                            saved_total={profile.saved_total}
                          />
                        </View>
                      )}
                    />
                  </View>
                </BottomSheetView>
              </BottomSheetModal>
            </View>
          </BottomSheetModalProvider>
        </SafeAreaView>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containerBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    maxWidth: "100%",
    minHeight: "100%",
    backgroundColor: "#E6EFD9",
  },

  imageBackground: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F846E8F",
    borderRadius: 125 / 2,
    width: 125,
    height: 125,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "700",
  },
  userName: {
    fontSize: 16,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  innerInfoBox: {
    alignItems: "center",
  },
  profileStat: {
    fontSize: 20,
    fontWeight: "700",
  },
  buttonMenu: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  editProfile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3CC91",
    gap: 6,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  notifcation: {
    backgroundColor: "#F3CC91",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bottomSheetContainer: {
    flexDirection: "column",
    padding: 20,
  },
  bottomSheetHeader: {
    fontFamily: "Lato", // Montserrat
    fontWeight: "600",
    fontSize: 20,
    color: "#004643",
  },
});
