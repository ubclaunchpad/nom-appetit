import AuthButton from "@components/AuthButton";
import InputForm from "@components/AuthInput";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user_id, password } = useLocalSearchParams();
  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState("");

  const postData = async () => {
    const response = await axios.post("http://127.0.0.1:5000/createProfile", {
      user_id: user_id,
      username: username,
      password: password,
    });
    if (response.data.username_exists) {
      setUsernameValidation("ⓘ This username is taken. Try another one.");
      return;
    }
    const token = response.data.token;
    router.push({
      pathname: "home",
      params: {
        token: token,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Create Username</Text>
        <View style={{ paddingTop: 10 }}>
          <InputForm
            title=""
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            autoCapitalize="none"
            secureTextEntry={false}
          />
          {usernameValidation !== "" && (
            <Text style={styles.validation}>{usernameValidation}</Text>
          )}
        </View>
        <Text style={[styles.text, { paddingTop: 10 }]}>
          • Can include letters (a-z), numbers (0-9), underscores (_), and
          periods(.)
        </Text>
        <Text style={[styles.text, { paddingTop: 5 }]}>
          • Spaces, emojis, and other special characters are not allowed
        </Text>
        <View style={{ paddingTop: 30 }}>
          <AuthButton title="Submit" onPress={postData} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
  innerContainer: {
    width: 344,
  },
  header: {
    fontSize: 24,
    fontFamily: "Lato",
    color: "#004643",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "Lato",
    color: "#004643",
  },
  validation: {
    color: "red",
    paddingTop: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
