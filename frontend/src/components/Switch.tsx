import { Pressable, StyleSheet, Text, View } from "react-native";

type SignInProps = {
  leftNavText: string;
  rightNavText: string;
  rightNav: boolean;
  setRightNav: (signIn: boolean) => void;
};

export default function Switch(props: SignInProps) {
  const handleLeftNav = () => {
    props.setRightNav(false);
  };
  const handleRightNav = () => {
    props.setRightNav(true);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          {
            marginRight: 5,
            backgroundColor: props.rightNav ? "#FFFFFF" : "#F3CC91",
          },
        ]}
        onPress={handleLeftNav}
      >
        <Text style={styles.buttonText}>{props.leftNavText}</Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          {
            marginLeft: 5,
            backgroundColor: props.rightNav ? "#F3CC91" : "#FFFFFF",
          },
        ]}
        onPress={handleRightNav}
      >
        <Text style={styles.buttonText}>{props.rightNavText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 12,
  },
  button: {
    width: 162,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Lato",
    color: "#004643",
  },
});
