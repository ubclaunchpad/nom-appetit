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
      <View style={styles.oAuthContainer}>
        <OAuthButtons
          message="or sign in with"
          paddedWindowWidth={paddedWindowWidth}
        />
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
