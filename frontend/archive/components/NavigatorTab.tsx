import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

export default function NavigatorTab() {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabItemContainer}>
        <Icon name="compass-outline" type="material-community" size={25} color="#747474" />
        <Text style={styles.tabText}>Discover</Text>
      </View>
      <View style={styles.tabItemContainer}>
        <Icon name="search" type="material" size={25} color="#747474" />
        <Text style={styles.tabText}>Search</Text>
      </View>
      <View style={styles.tabItemContainer}>
        <Icon name="person" type="material" size={25} color="#747474" />
        <Text style={styles.tabText}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 0,
    position: "absolute",
    zIndex: 5,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    paddingBottom: 30,
  },
  tabItemContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  tabText: {
    fontFamily: "Lato-SemiBold",
    color: "#747474",
  },
});
