import { Image, StyleSheet, Text, View } from "react-native";
import Images from "src/-assets/images";

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
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  textSmall: {
    fontSize: 16,
    color: "#004643",
    fontFamily: "Lato-Regular",
  },
  textLarge: {
    fontSize: 30,
    color: "#004643",
    fontFamily: "Lato-SemiBold",
  },
  image: {
    width: 110,
    height: 110,
  },
});
