import Navigation from "@components/Navigation";
import ProfileDisplay from "@components/ProfileDisplay";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import InputForm from "@components/InputForm";
import { Badge } from "@rneui/themed";

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

export default function FriendsList() {
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
          <Text style={styles.header}>My Friends</Text>
        </View>

        <View style={styles.search}>
          <InputForm
            value={search}
            onChangeText={setSearch}
            placeholder="Search user..."
            autoCapitalize="none"
            secureTextEntry={false}
            width={275}
          />
          <Pressable onPress={() => router.push("/friend_requests")}>
            <View style={styles.friendRequestsButton}>
              <FontAwesome name="envelope" size={24} color="#004643" />
              <Badge
                status="primary"
                containerStyle={{
                  width: 7,
                  height: 7,
                  position: "absolute",
                  top: 0,
                  left: 41,
                }}
                badgeStyle={{
                  backgroundColor: "red",
                }}
              />
            </View>
          </Pressable>
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
  friendRequestsButton: {
    backgroundColor: "#F3CC91",
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
