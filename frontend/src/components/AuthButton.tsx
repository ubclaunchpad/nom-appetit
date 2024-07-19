import { Pressable, StyleSheet, Text, View } from "react-native";

type SignInButtonProps = {
  onPress: () => void;
  title: string;
};

export default function SignInButton(props: SignInButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F3CC91",
    width: '50%',
    paddingVertical: 12,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  text: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#004643",
    textAlign: "center",
  },
});
