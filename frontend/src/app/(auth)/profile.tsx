import Images from "@assets/images";
import AuthButton from "@components/AuthButton";
import InputForm from "@components/InputForm";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.main}>
        <View style={styles.innerMain}>
          <Text style={styles.header}>Create Username</Text>
          <View style={styles.inputItem}>
            <InputForm
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              errorMessage={usernameValidation}
              autoCapitalize="none"
              secureTextEntry={false}
            />
          </View>
          <Text style={[styles.text, { paddingTop: 10 }]}>
            • Can include letters (a-z), numbers (0-9), underscores (_), and
            periods(.)
          </Text>
          <Text style={[styles.text, { paddingTop: 5 }]}>
            • Spaces, emojis, and other special characters are not allowed
          </Text>
          <View style={styles.submitContainer}>
            <AuthButton title="Submit" onPress={postData} />
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={Images.bambooFull} style={styles.image} />
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
  main: {
    width: "100%",
  },
  innerMain: {
    marginHorizontal: 40,
  },
  header: {
    fontSize: 24,
    fontFamily: "Lato-SemiBold",
    color: "#004643",
    textAlign: "center",
  },
  inputItem: {
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#004643",
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  imageContainer: {
    position: "absolute",
    bottom: -175,
    zIndex: -1,
  },
  image: {
    width: 400,
    height: 400,
  },
});
