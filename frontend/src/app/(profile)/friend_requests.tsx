import Navigation from "@components/Navigation";
import ProfileDisplay from "@components/ProfileDisplay";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputForm from "@components/InputForm";

type User = {
  name: string;
  username: string;
  image: string;
};

const recievedRequests: User[] = [
  {
    name: "Natasha Hill",
    username: "nathil",
    image: "test",
  },
  {
    name: "Name",
    username: "Username",
    image: "test",
  },
  {
    name: "Name",
    username: "Username",
    image: "test",
  },
  {
    name: "Name",
    username: "Username",
    image: "test",
  },
];

const sentRequests: User[] = [
  {
    name: "Natasha Hill",
    username: "nathil",
    image: "test",
  },
  {
    name: "Name",
    username: "Username",
    image: "test",
  },
  {
    name: "Name",
    username: "Username",
    image: "test",
  },
  {
    name: "Name",
    username: "Username",
    image: "test",
  },
];

export default function FriendRequests() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Navigation
          leftIcon="arrow-left"
          rightIcon="home"
          leftNavigationOnPress={() => router.back()}
        />
        <View style={[styles.headerContainer, { marginBottom: 20 }]}>
          <Text style={styles.header}>Friend Requests</Text>
        </View>

        <View style={styles.search}>
          <InputForm
            value={search}
            onChangeText={setSearch}
            placeholder="Username"
            autoCapitalize="none"
            secureTextEntry={false}
            width={334}
          />
        </View>

        <View style={styles.innerContainer}>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>
              Incoming ({recievedRequests.length})
            </Text>
            <View style={styles.acceptAllContainer}>
              <Text style={styles.acceptAll}>Accept All</Text>
            </View>
          </View>
          <FlatList
            data={sentRequests}
            renderItem={({ item }) => <ProfileDisplay {...item} />}
          />
        </View>

        <View style={styles.innerContainer}>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>Sent ({sentRequests.length})</Text>
          </View>
          <FlatList
            data={sentRequests}
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
  innerContainer: {
    maxHeight: "40%",
  },
  subHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 20,
    fontFamily: "Lato",
    fontWeight: "500",
    color: "#004643",
  },
  acceptAll: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Lato",
    color: "#004643",
  },
  acceptAllContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#F3CC91",
    borderRadius: 12,
  },
});
