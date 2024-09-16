import { View, Text, Image, StyleSheet } from "react-native";
import Images from "src/-assets/images";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

type Props = {
  name: string;
  username: string;
  image: string;
};

const ProfileDisplay = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBackground}>
        <FontAwesome name="user" size={24} color="white" />
      </View>
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <View style={[styles.typesAndPrice, { paddingTop: 6 }]}>
          <Text style={styles.typesAndPriceText}>@{props.username}</Text>
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
    fontFamily: "Lato",
    color: "#004643",
    fontSize: 16,
  },
  typesAndPrice: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  typesAndPriceText: {
    fontFamily: "Lato",
    fontSize: 14,
    color: "#004643",
  },
});

export default ProfileDisplay;
