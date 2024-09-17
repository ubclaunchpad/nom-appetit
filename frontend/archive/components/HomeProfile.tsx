import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar, Badge } from "react-native-elements";

type HomeProfileProps = {
  name: string;
  notifcationCount: number;
  profilePicture: string;
};

export default function HomeProfile(props: HomeProfileProps) {
  const { token } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Avatar
        source={{
          uri: props.profilePicture,
        }}
        size="small"
        avatarStyle={{ borderRadius: 8 }}
      />
      <View style={styles.profileText}>
        <Text
          style={{
            fontFamily: "Lato-Bold",
            fontSize: 14,
            color: "#1A1A1A",
            textAlign: "left",
          }}
        >
          {props.name}
        </Text>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "(profile)/profile",
              params: {
                token: token,
              },
            });
          }}
        >
          <Text
            style={{
              fontFamily: "Lato-Regular",
              fontSize: 14,
              color: "#777777",
              textAlign: "left",
            }}
          >
            Vancouver, BC
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileText: {
    marginLeft: 8,
  },
  text: {
    fontFamily: "Lato",
    color: "#004643",
    textAlign: "left",
  },
});
