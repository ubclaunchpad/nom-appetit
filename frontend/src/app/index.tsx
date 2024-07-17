import { useFonts } from "expo-font";
import SignIn from "./(auth)/signin";
import SignUp from "./(auth)/signup";
import { StyleSheet, View } from "react-native";
import Header from "@components/Header";
import Switch from "@components/Switch";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RootPage = () => {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("@assets/fonts/Lato-Regular.ttf"),
    "Lato-SemiBold": require("@assets/fonts/Lato-Semibold.ttf"),
    "Lato-Bold": require("@assets/fonts/Lato-Bold.ttf"),
  });

  const [signIn, setSignIn] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 40 }}>
        <Header />
      </View>

      <View style={{ paddingTop: 30 }}>
        <Switch signIn={signIn} setSignIn={setSignIn} />
      </View>

      {signIn ? <SignIn /> : <SignUp />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
});

export default RootPage;
