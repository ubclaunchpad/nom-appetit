import InputForm from "@components/InputForm";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../context/SessionContext";

export default function SignIn() {
  const { onLogin } = useSession();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFoundMessage, setUserNotFoundMessage] = useState("");
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");

  const handleSignIn = async () => {
    await onLogin(name, password);
    router.replace("/search/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputForm
          value={name}
          onChangeText={setName}
          placeholder="Username"
          errorMessage={userNotFoundMessage}
          autoCapitalize="none"
          secureTextEntry={false}
          borderRadius={8}
        />
        <InputForm
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          errorMessage={invalidPasswordMessage}
          autoCapitalize="none"
          secureTextEntry={true}
          borderRadius={8}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.replace('register')} style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
});
