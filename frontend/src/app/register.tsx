import InputForm from "@components/InputForm";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "src/context/SessionContext";
import { FIREBASE_STORAGE } from "firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";

const Register = () => {
  const { onRegister, onLogin } = useSession();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    validateEmail(email);
    await validateUsername(username);
    
    if (emailValid && usernameValid && passwordValid) {
      const response = await onRegister(email, username, name, password);
      const user_id = response.data.user_id;
      await addProfilePicture(user_id);
      await onLogin(username, password);
      router.replace("/search/");
    }
  };

  const addProfilePicture = async (user_id: string) => {
    const response = await fetch("https://i.postimg.cc/hvVKRDnP/Untitled-design-1.png");
    const blob = await response.blob();
    const storageRef = ref(FIREBASE_STORAGE, `users/${user_id}.jpg`);
    uploadBytesResumable(storageRef, blob);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailValid(false);
      setEmailError("ⓘ Invalid email address");
    } else {
      setEmailValid(true);
      setEmailError("");
    }
  };

  const validateUsername = async (username: string) => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/getAllUsernames`);
      const username_array: string[] = response.data["result"];
      if (username_array.includes(username)) {
        setUsernameValid(false);
        setUsernameError("ⓘ Username already taken");
      } else {
        setUsernameValid(true);
        setUsernameError("");
      }
    } catch (error) {
      setUsernameValid(false);
      setUsernameError("ⓘ Error checking username");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <InputForm
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            autoCapitalize="words"
            secureTextEntry={false}
            borderRadius={8}
          />
        </View>
        <View style={styles.inputWrapper}>
          <InputForm
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            autoCapitalize="none"
            secureTextEntry={false}
            borderRadius={8}
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
        </View>
        <View style={styles.inputWrapper}>
          <InputForm
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            autoCapitalize="none"
            secureTextEntry={false}
            borderRadius={8}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>
        <View style={styles.inputWrapper}>
          <InputForm
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            borderRadius={8}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.replace("/")} style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 30,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    gap: 15,
  },
  inputWrapper: {
    width: "100%",
  },
  button: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#1A1A1A",
  },
  errorText: {
    fontFamily: "GT-America-Standard-Regular",
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  input: {
    marginVertical: 0,
  },
});

export default Register;