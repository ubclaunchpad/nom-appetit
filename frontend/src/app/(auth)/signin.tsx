<<<<<<< HEAD
=======
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import InputForm from "@components/AuthInput";
>>>>>>> origin/restaurantScreens
import AuthButton from "@components/AuthButton";
import InputForm from "@components/InputForm";
import OAuthButtons from "@components/OAuthButtons";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFoundMessage, setUserNotFoundMessage] = useState("");
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");
  const paddedWindowWidth = Dimensions.get("window").width - 80;

  const postData = async () => {
    const response = await axios.post("http://127.0.0.1:5000/login", {
      username: username,
      password: password,
    });
    const { token, user_not_found, invalid_password } = response.data;
    if (user_not_found) {
      setUserNotFoundMessage("ⓘ User not found.");
      setInvalidPasswordMessage("");
      return;
    } else if (invalid_password) {
      setInvalidPasswordMessage("ⓘ Incorrect password.");
      setUserNotFoundMessage("");
      return;
    }
    router.replace({
      pathname: "home",
      params: {
        token: token,
      },
    });
  };

  return (
    <ScrollView>
      <View style={styles.inputItem}>
        <InputForm
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          errorMessage={userNotFoundMessage}
          autoCapitalize="none"
          secureTextEntry={false}
        />
      </View>
      <View style={styles.inputItem}>
        <InputForm
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          errorMessage={invalidPasswordMessage}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.submitContainer}>
        <AuthButton title="Sign In" onPress={postData} />
      </View>
<<<<<<< HEAD
      <View style={styles.oAuthContainer}>
        <OAuthButtons
          message="or sign in with"
          paddedWindowWidth={paddedWindowWidth}
        />
=======

      <View style={[styles.lineContainer, { paddingTop: 30 }]}>
        <View style={styles.line} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>or sign in with</Text>
          <Link href="(restaurant)/restaurant_display" style={{ fontSize: 5 }}>
            Restaurant
          </Link>
        </View>
        <View style={styles.line} />
      </View>

      <View style={[styles.signInOptions, { paddingTop: 30 }]}>
        <Pressable style={styles.optionButtons}>
          <Image source={Images.facebook} style={styles.image} />
        </Pressable>
        <Pressable style={styles.optionButtons}>
          <Image source={Images.google} style={styles.image} />
        </Pressable>
        <Pressable style={styles.optionButtons}>
          <Image source={Images.apple} style={styles.image} />
        </Pressable>
>>>>>>> origin/restaurantScreens
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputItem: {
    marginTop: 15,
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  oAuthContainer: {
    alignItems: "center",
    marginTop: 30,
  },
});
