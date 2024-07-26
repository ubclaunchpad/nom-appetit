import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

type NavigationProps = {
  backNavigation: string
};

const routeBack = (backNavigation: string) => {
  router.push({
    pathname: backNavigation,
    params: {
      token: '1234'
    },
  });
}

const routeHome = () => { 
  router.push({
    pathname: "home",
    params: {
      token: '1234'
    },
  });
}

export default function Navigation(props: NavigationProps) {
  return (
    <View style={styles.container}>
      <Pressable>
        <Icon name="arrow-left" type="font-awesome" color="#004643" size={26} onPress={() => routeBack(props.backNavigation)} />
      </Pressable>
      <Pressable>
        <Icon name="home" type="font-awesome" color="#004643" size={30} onPress={routeHome} />
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
