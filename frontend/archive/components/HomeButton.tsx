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
        <Icon name={props.icon} size={50} color="#6F846E" type="font-awesome-5"/>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 152,
    height: 152,
    padding: 10,
    backgroundColor: "#E6EFD9",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    color: "#6F846E",
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
