import Header from "@components/Header";
import Switch from "@components/Switch";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignIn from "./(auth)/signin";
import SignUp from "./(auth)/signup";

SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("@assets/fonts/Lato-Regular.ttf"),
    "Lato-SemiBold": require("@assets/fonts/Lato-Semibold.ttf"),
    "Lato-Bold": require("@assets/fonts/Lato-Bold.ttf"),
  });
  const paddedWindowWidth = Dimensions.get('window').width - 80;
  const [rightNav, setRightNav] = useState(false);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.headerContainer}>
            <Header />
          </View>
          <View style={styles.switchContainer}>
            <Switch
              rightNav={rightNav}
              setRightNav={setRightNav}
              leftNavText="Create Account"
              rightNavText="Sign In"
              paddedWindowWidth={paddedWindowWidth} 
            />
          </View>
          <View>
            {rightNav ? <SignIn /> : <SignUp />}
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
  main: {
    marginHorizontal: 40,
  },
  headerContainer: {
    marginTop: 60,
  },
  switchContainer: {
    marginTop: 30,
  },
});

export default RootPage;
