import { Text, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import axios from "axios";

export const Profile = () => {
  const getUserData = async () => {
    const { data } = await axios.get("http://127.0.0.1:5000/getProfile", {
      params: {
        token: 123123,
      },
    });

    console.log(data);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={styles.imageBackground}>
        <FontAwesome name="user" size={52} color="white" />
      </View>
      <Text style={styles.fullName}>Name</Text>
      <Text style={styles.userName}>Username</Text>
      <Text>Bio</Text>
      <View style={styles.infoBox}>
        <Pressable onPress={() => router.push("/friends_list")}>
          <View style={styles.innerInfoBox}>
            <Text>Friends</Text>
            <Text style={styles.profileStat}>100</Text>
          </View>
        </Pressable>
        <Text>|</Text>
        <Pressable onPress={() => router.push("/saved_restaurants")}>
          <View style={styles.innerInfoBox}>
            <Text>Saved</Text>
            <Text style={styles.profileStat}>100</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.buttonMenu}>
        <Pressable
          style={styles.editProfile}
          onPress={() => router.push("/edit_profile")}
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
          onPress={() => router.push("/friend_requests")}
          style={styles.notifcation}
        >
          <Ionicons name="notifications" size={24} color="#004643" />
        </Pressable>
      </View>
    </SafeAreaView>
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
    backgroundColor: "#6F846E",
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
});
