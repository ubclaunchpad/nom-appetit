import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

type NavigationProps = {
  leftIcon?: string;
  leftNavigationOnPress?: () => void;
  rightIcon?: string;
  rightNavigationOnPress?: () => void;
  color?: string;
};

export default function Navigation(props: NavigationProps) {
  return (
    <View style={styles.container}>
      <Pressable>
        <Icon
          name={props.leftIcon}
          type="font-awesome"
          color={props.color || "#004643"}
          size={26}
          onPress={props.leftNavigationOnPress}
        />
      </Pressable>
      <Pressable>
        <Icon
          name={props.rightIcon}
          type="font-awesome"
          color={props.color || "#004643"}
          size={30}
          onPress={props.rightNavigationOnPress}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
