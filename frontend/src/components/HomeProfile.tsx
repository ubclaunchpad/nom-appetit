import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar, Badge } from "react-native-elements";

type HomeProfileProps = {
  name: string;
  notifcationCount: number;
  profilePicture: string;
};

export default function HomeProfile(props: HomeProfileProps) {
  return (
    <View style={styles.container}>
      <View style={styles.profileText}>
        <Text
          style={{
            fontFamily: "Lato-SemiBold",
            color: "#004643",
            textAlign: "right",
          }}
        >
          {props.name}
        </Text>
        <Pressable onPress={() => {}}>
          <Text
            style={{ fontFamily: "Lato", color: "#004643", textAlign: "right" }}
          >
            View Profile
          </Text>
        </Pressable>
      </View>
      <Avatar
        rounded
        source={{
          uri: props.profilePicture,
        }}
        size="small"
      />
      <Badge
        status="error"
        value={props.notifcationCount}
        containerStyle={{ position: "absolute", top: -5, right: -5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  profileText: {
    marginRight: 10,
  },
  text: {
    fontFamily: "Lato",
    color: "#004643",
    textAlign: "right",
  },
});
