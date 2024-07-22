import Header from "@components/Header";
import Switch from "@components/Switch";
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignIn from "./(auth)/signin";
import SignUp from "./(auth)/signup";

const RootPage = () => {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("@assets/fonts/Lato-Regular.ttf"),
    "Lato-SemiBold": require("@assets/fonts/Lato-Semibold.ttf"),
    "Lato-Bold": require("@assets/fonts/Lato-Bold.ttf"),
  });

  const [rightNav, setRightNav] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Link href="(search)/search" style={{ fontSize: 5 }}>
          Search
        </Link>
        <Link href="(search)/modal" style={{ fontSize: 5 }}>
          Modal
        </Link>

        <View style={{ paddingTop: 30 }}>
          <Header />
        </View>

        <View style={{ paddingTop: 30 }}>
          <Switch
            rightNav={rightNav}
            setRightNav={setRightNav}
            leftNavText="Create Account"
            rightNavText="Sign In"
          />
        </View>

        <View style={{ paddingTop: 20 }}>
          {rightNav ? <SignIn /> : <SignUp />}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
  main: {
    width: 334,
  },
});

export default RootPage;
