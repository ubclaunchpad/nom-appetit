import React, { FunctionComponent } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FlowContainer } from "typescript";
import { RestaurantInfoContainer } from "../styles/Theme";
import { StarRatingDisplay } from "react-native-star-rating-widget";

interface Props {
  type: string;
  name: string;
  rating: number;
  distance: string;
}

export const RestaurantInfoComponent = ({
  type,
  name,
  rating,
  distance,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/dummy-image.png")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.column}>
        <Text style={{ fontSize: 16, fontWeight: 500, color: "#004643" }}>
          {name}
        </Text>
        <StarRatingDisplay
          rating={rating}
          starSize={20}
          color="#f9bc60"
          style={{ marginHorizontal: -5 }}
        />
        <Text style={{ fontSize: 12, color: "#004643" }}> {type} </Text>
        <Text style={{ fontSize: 12, color: "#004643" }}> {distance} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RestaurantInfoContainer,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 150,
    alignItems: "center",
    marginVertical: 8,
  },
  column: {
    margin: 0,
    flexDirection: "column",
    width: "50%",
    height: "50%",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  imageContainer: {
    width: "60%",
    height: "100%",
    marginLeft: 50,
  },
});
