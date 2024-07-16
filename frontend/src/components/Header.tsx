import { Image, StyleSheet, Text, View } from "react-native";
import Images from "assets/images";

export default function Header() {
  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.textSmall}> Welcome to</Text>
        <Text style={styles.textLarge}> Nom Appetit</Text>
      </View>
      <Image source={Images.pandaBamboo} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    paddingRight: 20,
    alignItems: "center",
  },
  textSmall: {
    fontSize: 16,
    color: "#004643",
    fontFamily: "Lato",
  },
  textLarge: {
    fontSize: 30,
    color: "#004643",
    fontWeight: "600",
    fontFamily: "Lato",
  },
  image: {
    width: 110,
    height: 110,
  },
});