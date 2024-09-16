import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";

interface ReviewInfoProps {
  review_id: string;
  user_id: string;
  review: string;
  rating: number;
  images: string[];
  profile_picture: string;
  name: string;
  review_total: number;
  saved_total: number;
  date: string;
}

const generateFullStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <View style={styles.iconContainer}>
        <Icon name="star" type="font-awesome" color="#FFFFFF" size={14} />
      </View>
    );
  }
  return stars;
};

export const ReviewInfo = (props: ReviewInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar source={{ uri: props.profile_picture }} size={32} avatarStyle={styles.avatar} />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <View style={styles.infoTextContainer}>
            <View style={styles.profileInfo}>
              <Icon name="account-box" type="material-community" color="#7F7E78" size={14} />
              <Text style={styles.reviewsNum}>{props.review_total}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Icon name="star-box" type="material-community" color="#7F7E78" size={14} />
              <Text style={styles.reviewsNum}>{props.saved_total}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.starsTimeContainer}>
        <View style={styles.starsContainer}>{generateFullStars(props.rating)}</View>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewText}>{props.review}</Text>
      </View>
      {props.images && props.images.length > 0 && (
        <ScrollView style={styles.imageContainer} contentContainerStyle={styles.imageContainerStyle} horizontal>
          {props.images.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.foodImage} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    borderRadius: 8,
  },
  profileInfoContainer: {
    paddingLeft: 8,
  },
  name: {
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 14,
    color: "#1A1A1A",
  },
  infoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  reviewTextContainer: { 
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  reviewsNum: {
    fontFamily: "Lato-SemiBold",
    fontSize: 14,
    color: "#7F7E78",
  },
  starsTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 5,
    gap: 5,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  iconContainer: {
    borderRadius: 4,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    backgroundColor: "#FF462D",
  },
  reviewText: {
    fontFamily: "GT-America-Standard-Regular",
    color: "#1A1A1A",
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 15,
  },
  imageContainerStyle: {
    gap: 10,
  },
  foodImage: {
    width: 150,
    height: 100,
  },
});
