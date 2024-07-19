import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import InputForm from "@components/AuthInput";
import AuthButton from "@components/AuthButton";
import Images from "@assets/images";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFoundMessage, setUserNotFoundMessage] = useState("");
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");

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
    router.push({
      pathname: "home",
      params: {
        token: token,
      },
    });
  };

  return (
    <ScrollView>
      <View>
        <InputForm
          title="Username"
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
          autoCapitalize="none"
          secureTextEntry={false}
        />
        {userNotFoundMessage !== "" && (
          <Text style={styles.validation}>{userNotFoundMessage}</Text>
        )}
      </View>

      <View style={{ paddingTop: 15 }}>
        <InputForm
          title="Password"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        {invalidPasswordMessage !== "" && (
          <Text style={styles.validation}>{invalidPasswordMessage}</Text>
        )}
      </View>

      <View style={{ paddingTop: 30 }}>
        <AuthButton title="Sign In" onPress={postData} />
      </View>

      <View style={[styles.lineContainer, { paddingTop: 30 }]}>
        <View style={styles.line} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>or sign in with</Text>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#004643",
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  text: {
    color: "#004643",
    fontSize: 16,
    fontFamily: "Lato",
  },
  signInOptions: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  optionButtons: {
    justifyContent: "center",
    alignItems: "center",
    width: 104,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#80A29E",
    backgroundColor: "white",
  },
  image: {
    width: 20,
    height: 20,
  },
  validation: {
    color: "red",
    paddingTop: 5,
  },
});
