import HomeButton from "@components/HomeButton";
import HomeProfile from "@components/HomeProfile";
import InputForm from "@components/InputForm";
import Images from "@assets/images";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [password, setPassword] = useState("");
  const { token } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.innerMain}>
          <View style={styles.profileContainer}>
            <HomeProfile
              name="John Doe"
              notifcationCount={3}
              profilePicture="https://randomuser.me/api/portraits/men/41.jpg"
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>What would you like to eat?</Text>
          </View>
          <View style={styles.searchContainer}>
            <InputForm
              value={password}
              onChangeText={setPassword}
              placeholder="Search for a restaurant..."
              autoCapitalize="none"
              secureTextEntry={false}
              searchInput={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <HomeButton
              onPress={() => {}}
              headerText="Saved Restaurants"
              icon="heart"
            />
            <HomeButton
              onPress={() => {}}
              headerText="Give me suggestions"
              icon="lightbulb-on"
            />
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
    width: "100%",
    alignItems: "center",
    backgroundColor: "#E6EFD9",
  },
  main: {
    width: "100%",
  },
  innerMain: {
    marginHorizontal: 40,
  },
  profileContainer: {
    marginTop: 10,
  },
  headerContainer: {
    marginTop: 125,
  },
  headerText: {
    fontFamily: "Lato-SemiBold",
    fontSize: 20,
    color: "#004643",
    textAlign: "center",
  },
  searchContainer: {
    marginTop: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  imageContainer: {
    position: "absolute",
    bottom: -150,
    zIndex: -1,
  },
  image: {
    width: 400,
    height: 400,
  },
});
