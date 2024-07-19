import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

type NavigationProps = {
  exitNavigation: string
};

const routeBack = (exitNavigation: string) => {
  router.push({
    pathname: exitNavigation,
    params: {
      token: '1234'
    },
  });
}

export default function ExitNavigation(props: NavigationProps) {
  return (
    <View style={styles.container}>
      <Pressable>
        <Icon name="times" type="font-awesome" color="#004643" size={30} onPress={() => routeBack(props.exitNavigation)} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
