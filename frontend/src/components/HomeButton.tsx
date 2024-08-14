import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

type HomeButtonProps = {
  onPress: () => void;
  headerText: string;
  icon: string;
};

export default function HomeButton(props: HomeButtonProps) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.square}>
        <Text style={styles.iconText}>{props.headerText}</Text>
        <Icon name={props.icon} size={50} color="#004643" type="material-community"/>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 152,
    height: 152,
    padding: 10,
    backgroundColor: "#F3CC91",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
    fontFamily: "Lato",
    color: "#004643",
    marginBottom: 10,
    textAlign: "center",
  },
  bottomImageBackground: {
    position: "absolute",
    bottom: -100,
    left: 0,
    right: 0,
    height: 300
  },
  bottomImageStyle: {
    borderRadius: 12
  },
});
