import Navigation from "@components/Navigation";
import ProfileDisplay from "@components/ProfileDisplay";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";

type MenuItem = {
  name: string;
  username: string;
  image: string;
};

const items: MenuItem[] = [
  {
    name: "Bryan Tao",
    username: "b.tao",
    image: "test",
  },
  {
    name: "Name Tao",
    username: "Username",
    image: "test",
  },
  {
    name: "Name Tao",
    username: "Username",
    image: "test",
  },
  {
    name: "Name Tao",
    username: "Username",
    image: "test",
  },
];

export default function FriendsList() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={{ marginTop: 10 }}>
          <Navigation backNavigation="home" />
        </View>

        <View style={[styles.headerContainer, { marginVertical: 20 }]}>
          <Text style={styles.header}>My Friends</Text>
        </View>

        <View style={styles.search}>
          <Input
            placeholder="Search for a user..."
            placeholderTextColor="#0046434D"
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={{
              maxWidth: 280,
              maxHeight: 48,
              backgroundColor: "white",
              borderRadius: 12,
            }}
            leftIcon={<FontAwesome name="search" size={20} color="#004643" />}
          />

          <View style={styles.friendRequestsButton}>
            <FontAwesome name="envelope" size={20} color="#004643" />
          </View>
        </View>

        <View style={{ flex: 1, marginBottom: 10 }}>
          <FlatList
            data={items}
            renderItem={({ item }) => <ProfileDisplay {...item} />}
          />
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
    width: 334,
    flex: 1,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Lato",
    color: "#004643",
  },
  search: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
    borderRadius: 12,
    backgroundColor: "white",
  },
  input: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "Lato",
    paddingLeft: 10,
  },
  friendRequestsButton: {
    backgroundColor: "#F3CC91",
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
