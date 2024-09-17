import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

type NavigationProps = {
  leftIcon?: string;
  leftNavigationOnPress?: () => void;
  middleIcon?: string;
  middleNavigationOnPress?: () => void;
  rightIcon?: string;
  rightNavigationOnPress?: () => void;
  color?: string;
};

export default function Navigation(props: NavigationProps) {
  return (
    <View style={styles.container}>
      <Pressable>
        <Icon name={props.leftIcon} type="material-community" color={props.color || "#1A1A1A"} size={22} onPress={props.leftNavigationOnPress} />
      </Pressable>
      <View style={styles.rightSide}>
        <Pressable>
          <Icon name={props.middleIcon} type="material-community" color={props.color || "#1A1A1A"} size={26} onPress={props.middleNavigationOnPress} />
        </Pressable>
        <Pressable>
          <Icon name={props.rightIcon} type="material-community" color={props.color || "#1A1A1A"} size={26} onPress={props.rightNavigationOnPress} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
