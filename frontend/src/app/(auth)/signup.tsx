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
import InputForm from "@components/InputForm";
import AuthButton from "@components/AuthButton";
import Images from "@assets/images";
import axios from "axios";

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
      <View style={{ paddingTop: 20 }}>
        <InputForm
          title="Full Name"
          onChangeText={setName}
          value={name}
          placeholder="Full Name"
          autoCapitalize="words"
          secureTextEntry={false}
        />
      </View>

      <View style={{ paddingTop: 20 }}>
        <InputForm
          title="Email"
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          secureTextEntry={false}
        />
        {emailValidation !== "" && (
          <Text style={styles.validation}>{emailValidation}</Text>
        )}
      </View>

      <View style={{ paddingTop: 20 }}>
        <InputForm
          title="Password"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        {passwordValidation !== "" && (
          <Text style={styles.validation}>{passwordValidation}</Text>
        )}
      </View>

      <View style={{ paddingTop: 30 }}>
        <AuthButton title="Sign Up" onPress={postData} />
      </View>

      <View style={[styles.lineContainer, { paddingTop: 30 }]}>
        <View style={styles.line} />

        <View style={styles.textContainer}>
          <Text style={styles.text}>or sign up with</Text>
        </View>

        <View style={styles.line} />
      </View>

      <View
        style={[styles.signInOptions, { paddingTop: 30, paddingBottom: 30 }]}
      >
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
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  optionButtons: {
    justifyContent: "center",
    alignItems: "center",
    width: 108,
    height: 61,
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
