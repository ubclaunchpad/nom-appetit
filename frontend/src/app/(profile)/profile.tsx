import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Button,
  FlatList,
  Alert,
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

type profile_info = {
  name: string;
  username: string;
  bio: string;
  friends: string[];
  saved: string[];
  reviews: string[];
};

export const Profile = () => {
  const { token } = useLocalSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState<profile_info>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:5000/getUserInformation",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setProfile(data);
        setLoaded(true);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  console.log(token);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["42.5%", "87.5%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef, loaded]);

  return (
    <>
      {loaded && (
        <SafeAreaView style={styles.containerBackground}>
          <View style={{ width: 334 }}>
            <Navigation
              leftIcon="arrow-left"
              rightIcon="home"
              leftNavigationOnPress={() => router.back()}
            />
          </View>

          <View style={styles.imageBackground}>
            <FontAwesome name="user" size={52} color="white" />
          </View>
          <Text style={styles.fullName}>{profile.name}</Text>
          <Text style={styles.userName}>{profile.username}</Text>
          <Text>{profile.bio}</Text>
          <View style={styles.infoBox}>
            <Pressable onPress={() => router.push("/friends_list")}>
              <View style={styles.innerInfoBox}>
                <Text>Friends</Text>
                <Text style={styles.profileStat}>{profile.friends.length}</Text>
                <Badge
                  status="primary"
                  containerStyle={{
                    width: 2,
                    height: 2,
                    position: "absolute",
                    top: 0,
                    left: 53,
                  }}
                  badgeStyle={{
                    backgroundColor: "red",
                  }}
                />
              </View>
            </Pressable>
            <Text>|</Text>
            <Pressable onPress={() => router.push("/saved_restaurants")}>
              <View style={styles.innerInfoBox}>
                <Text>Saved</Text>
                <Text style={styles.profileStat}>{profile.saved.length}</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.buttonMenu}>
            <Pressable
              style={styles.editProfile}
              onPress={() => {
                router.push({
                  pathname: "edit_profile",
                  params: {
                    token: token,
                  },
                });
              }}
            >
              <FontAwesome5 name="pencil-alt" size={14} color="#004643" />
              <Text style={{ color: "#004643" }}>Edit Profile</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/find_friends")}
              style={styles.findFriends}
            >
              <MaterialCommunityIcons
                name="account-search"
                size={24}
                color="#004643"
              />
            </Pressable>
            <Pressable
              onPress={() => router.push("/notifications")}
              style={styles.notifcation}
            >
              <Ionicons name="notifications" size={24} color="#004643" />
              <Badge
                status="primary"
                value={2}
                containerStyle={{
                  maxWidth: 1,
                  maxHeight: 1,
                  position: "absolute",
                  top: 2,
                  left: 33,
                }}
                badgeStyle={{
                  backgroundColor: "red",
                }}
              />
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
                    My Reviews ({profile.reviews.length})
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    <FlatList
                      data={listReview}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "#6F846E8F",
                            borderRadius: 12,
                            marginBottom: 15,
                          }}
                        >
                          <ReviewInfo {...item} />
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

  findFriends: {
    backgroundColor: "#F3CC91",
    paddingRight: 8,
    paddingLeft: 10,
    paddingVertical: 6,
    borderRadius: 12,
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
