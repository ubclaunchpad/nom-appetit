import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SignInProps = {
  signIn: boolean;
  setSignIn: (signIn: boolean) => void;
};

export default function Switch(props: SignInProps) {
  const handleCreateAccount = () => {
    props.setSignIn(false);
  };

  const handleSignIn = () => {
    props.setSignIn(true);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          {
            marginRight: 10,
            backgroundColor: props.signIn ? "#FFFFFF" : "#F3CC91",
          },
        ]}
        onPress={handleCreateAccount}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          { backgroundColor: props.signIn ? "#F3CC91" : "#FFFFFF" },
        ]}
        onPress={handleSignIn}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 12,
  },
  button: {
    width: 162,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Lato",
    color: "#004643",
  },
});
