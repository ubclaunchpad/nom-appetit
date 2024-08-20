import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

type Props = {
  image_url: string;
  message: string;
  sender: string;
  time: string; // Could be changed to date
};

const NotificationBox = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBackground}>
        <FontAwesome name="user" size={24} color="white" />
      </View>
      <View style={{ maxWidth: 175, marginLeft: 15 }}>
        <Text style={styles.name}>{props.message}</Text>
        <View style={[styles.senderContainer, { paddingTop: 6 }]}>
          <Text style={styles.senderHeader}>{props.sender}</Text>
          <View style={styles.iconContainer}>
            <FontAwesome name="check" size={23} color="#004643" />
            <FontAwesome name="times" size={23} color="#D02B2B" />
          </View>

          <Text style={styles.time}>{props.time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 150,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    paddingLeft: 30,
    borderRadius: 12,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 70 / 2,
  },
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F846E8F",
    borderRadius: 70 / 2,
    width: 70,
    height: 70,
    marginRight: 10,
  },
  name: {
    fontFamily: "Montserrat_400Regular",
    color: "#004643",
    fontSize: 16,
  },
  senderContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  senderHeader: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    color: "#004643",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 3,
  },
  time: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: "#004643",
  },
});

export default NotificationBox;
