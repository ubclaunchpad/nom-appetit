import AuthButton from "@components/AuthButton";
import InputForm from "@components/InputForm";
import OAuthButtons from "@components/OAuthButtons";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const postData = async () => {
    const response = await axios.post("http://127.0.0.1:5000/createUser", {
      name: name,
      email: email,
      password: password,
    });
    const email_exists = response.data.email_exists;
    const email_invalid = response.data.email_invalid;
    const password_too_short = response.data.password_too_short;
    const user_id = response.data.user_id;
    if (email_exists) {
      setPasswordValidation("");
      setEmailValidation("ⓘ Email already exists");
      return;
    }
    if (email_invalid) {
      setPasswordValidation("");
      setEmailValidation("ⓘ Email is invalid");
      return;
    }
    if (password_too_short) {
      setEmailValidation("");
      setPasswordValidation("ⓘ Password is too short");
      return;
    }
    router.push({
      pathname: "(auth)/profile",
      params: { user_id: user_id, password: password },
    });
  };

  return (
    <ScrollView>
      <View style={styles.inputItem}>
        <InputForm
          label="Your name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          autoCapitalize="words"
          secureTextEntry={false}
        />
      </View>
      <View style={styles.inputItem}>
        <InputForm
          label="Email address"
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          errorMessage={emailValidation}
          autoCapitalize="none"
          secureTextEntry={false}
        />
      </View>
      <View style={styles.inputItem}>
        <InputForm
          label="Create password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create password"
          errorMessage={passwordValidation}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.submitContainer}>
        <AuthButton title="Create account" onPress={postData} />
      </View>
      <View style={styles.oAuthContainer}>
        <OAuthButtons message="or sign up with"/>
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
