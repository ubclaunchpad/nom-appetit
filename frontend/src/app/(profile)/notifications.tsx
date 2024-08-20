import Navigation from "@components/Navigation";
import ProfileDisplay from "@components/ProfileDisplay";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import InputForm from "@components/InputForm";
import { Badge } from "@rneui/themed";
import Images from "@assets/images";
import NotificationBox from "@components/NotificationBox";

type notification = {
  image_url: string;
  message: string;
  sender: string;
  time: string; // Could be changed to date
};

const notifications: notification[] = [
  {
    image_url: Images.dummyImage,
    message: "You recieved a group survey invite from:",
    sender: "Jonathan Ma",
    time: "Just now",
  },
  {
    image_url: Images.dummyImage,
    message: "You recieved a group survey invite from:",
    sender: "Jonathan Ma",
    time: "Just now",
  },
  {
    image_url: Images.dummyImage,
    message: "You recieved a group survey invite from:",
    sender: "Jonathan Ma",
    time: "Just now",
  },
  {
    image_url: Images.dummyImage,
    message: "You recieved a group survey invite from:",
    sender: "Jonathan Ma",
    time: "Just now",
  },
  {
    image_url: Images.dummyImage,
    message: "You recieved a group survey invite from:",
    sender: "Jonathan Ma",
    time: "Just now",
  },
];

const Notifications = () => {
  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={{ width: 334 }}>
        <Navigation
          leftIcon="arrow-left"
          rightIcon="home"
          leftNavigationOnPress={() => router.back()}
        />
      </View>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.notificationsContainer}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationBox {...item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100%",
    minHeight: "100%",
    backgroundColor: "#E6EFD9",
    gap: 20,
  },

  notificationsContainer: {
    flex: 1,
    width: 334,
  },

  title: {
    fontFamily: "Lato",
    fontWeight: 600,
    fontSize: 24,
    color: "#004643",
  },

  inputContent: {
    width: "90%",
  },

  input: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "Lato",
  },
  inputContainer: {
    borderBottomWidth: 0,
    borderRadius: 12,
    backgroundColor: "white",
  },
  bio: {
    padding: 15,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "Lato",
    textAlignVertical: "top",
    minHeight: 200,
  },
  bioContainer: {
    borderBottomWidth: 0,
    borderRadius: 12,
    backgroundColor: "white",
  },

  saveText: {
    fontSize: 16,
    fontFamily: "Lato",
    color: "#004643",
  },
  saveContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3CC91",
    minHeight: 40,
    minWidth: 184,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
});

export default Notifications;
