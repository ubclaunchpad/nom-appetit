import Navigation from "@components/Navigation";
import ProfileDisplay from "@components/ProfileDisplay";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputForm from "@components/InputForm";

type User = {
  name: string;
  username: string;
  image: string;
};

const items: User[] = [
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

export default function FindFriends() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={{ marginTop: 10 }}>
          <Navigation
            leftIcon="arrow-left"
            rightIcon="home"
            leftNavigationOnPress={() => router.back()}
          />
        </View>

        <View style={[styles.headerContainer, { marginVertical: 20 }]}>
          <Text style={styles.header}>Find Friends</Text>
        </View>

        <View style={styles.search}>
          <InputForm
            value={search}
            onChangeText={setSearch}
            placeholder="Search for a user..."
            autoCapitalize="none"
            secureTextEntry={false}
            width={334}
          />
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
});
