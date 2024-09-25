import InputForm from "@components/InputForm";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../context/SessionContext";

export default function SignIn() {
  const { onLogin } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleSignIn = async () => {
    const result = await onLogin(username, password);
    console.log(result)
    if (result == "USER_NOT_FOUND") {
      setUserNotFound(true);
      setInvalidPassword(false);
    } else if (result == "INVALID_PASSWORD") {
      setInvalidPassword(true);
      setUserNotFound(false);
    } else {
      router.replace("/search/");
    }
  };

  console.log(userNotFound)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <InputForm
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            autoCapitalize="none"
            secureTextEntry={false}
            borderRadius={8}
          />
          {userNotFound ? <Text style={styles.errorText}>ⓘ User not found</Text> : null}
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
          {invalidPassword ? <Text style={styles.errorText}>ⓘ Invalid password</Text> : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.replace("register")} style={styles.link}>
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
  errorText: {
    fontFamily: "GT-America-Standard-Regular",
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  input: {
    marginVertical: 0,
  },
  inputWrapper: {
    width: "100%",
  },
});
