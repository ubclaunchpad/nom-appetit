import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const index = () => {
  return (
    <SafeAreaView>
      <Pressable onPress={() => router.push("/register")}>
        <Text>Register</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/sign-in")}>
        <Text>Sign In</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default index;
