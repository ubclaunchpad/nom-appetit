import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import Images from "@assets/images";

type OAuthButtonsProps = {
  message: string;
  paddedWindowWidth: number;
};

export default function OAuthButtons(props: OAuthButtonsProps) {
  const buttonWidth = (props.paddedWindowWidth / 3);

  return (
    <View>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.message}</Text>
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.signInOptions}>
        <Pressable style={[styles.optionButton, { width: buttonWidth}]} onPress={() => {}}>
          <Image source={Images.facebook} style={styles.image} />
        </Pressable>
        <Pressable style={[styles.optionButton, { width: buttonWidth}]} onPress={() => {}}>
          <Image source={Images.google} style={styles.image} />
        </Pressable>
        <Pressable style={[styles.optionButton, { width: buttonWidth}]} onPress={() => {}}>
          <Image source={Images.apple} style={styles.image} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#004643",
  },
  textContainer: {
    marginHorizontal: 12,
  },
  text: {
    color: "#004643",
    fontSize: 16,
    fontFamily: "Lato-SemiBold",
  },
  signInOptions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  optionButton: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#80A29E",
    backgroundColor: "white",
  },
});
