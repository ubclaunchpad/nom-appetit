import Header from "@components/Header";
import Switch from "@components/Switch";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Link, SplashScreen } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignIn from "./(auth)/signin";
import SignUp from "./(auth)/signup";
import Images from "@assets/images";

SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("@assets/fonts/Lato-Regular.ttf"),
    "Lato-SemiBold": require("@assets/fonts/Lato-Semibold.ttf"),
    "Lato-Bold": require("@assets/fonts/Lato-Bold.ttf"),
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const paddedWindowWidth = Dimensions.get("window").width - 60;
  const [rightNav, setRightNav] = useState(false);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.innerMain}>
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
            <View>{rightNav ? <SignIn /> : <SignUp />}</View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={Images.bambooRight} style={styles.image} />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
  main: {
    width: "100%",
  },
  innerMain: {
    marginHorizontal: 30,
  },
  headerContainer: {
    marginTop: 30,
  },
  switchContainer: {
    marginTop: 30,
  },
  imageContainer: {
    position: "absolute",
    bottom: -50,
    right: -50,
    zIndex: -1,
  },
  image: {
    width: 275,
    height: 275,
    resizeMode: "contain"
  },
});

export default RootPage;
