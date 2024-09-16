import Images from "assets/images"
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";

interface ReviewInfoProps {
  name: string;
  reviews: number;
  photos: number;
  rating: number;
  time: string;
  description: string;
  profilePicture: string;
}

export const ReviewInfo = (props: ReviewInfoProps) => {
  const truncateName = (name: string) => (name.length > 25 ? `${name.substring(0, 22)}...` : name);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar source={{ uri: props.profilePicture }} size={34} avatarStyle={styles.avatar} />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.name}>{truncateName(props.name)}</Text>
          <View style={styles.infoTextContainer}>
            <View style={styles.profileInfo}>
              <Icon name="account-box" type="material-community" color="#7F7E78" size={14} />
              <Text style={styles.reviewsNum}>{props.reviews}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Icon name="star-box" type="material-community" color="#7F7E78" size={14} />
              <Text style={styles.reviewsNum}>{props.reviews}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.starsTimeContainer}>
        <View style={styles.starsContainer}>
          <View style={styles.iconContainer}>
            <Icon name="star" type="font-awesome" color="#FFFFFF" size={14} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="star" type="font-awesome" color="#FFFFFF" size={14} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="star" type="font-awesome" color="#FFFFFF" size={14} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="star" type="font-awesome" color="#FFFFFF" size={14} />
          </View>
        </View>
        <Text style={styles.timeText}>1 week ago</Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>{props.description}</Text>
      </View>
      <ScrollView style={styles.imageContainer} contentContainerStyle={styles.imageContainerStyle} horizontal>
        <Image source={Images.dummyFood1} style={styles.foodImage} />
        <Image source={Images.dummyFood2} style={styles.foodImage} />
        <Image source={Images.dummyFood2} style={styles.foodImage} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  avatar: {
    borderRadius: 17,
  },
  reviewsNum: {
    fontFamily: "Lato-SemiBold",
    fontSize: 14,
    color: "#7F7E78",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfoContainer: {
    paddingLeft: 8,
  },
  name: {
    fontFamily: "Lato-Bold",
    fontSize: 14,
    color: "#1A1A1A",
  },
  infoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  starsTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 5,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2.5,
  },
  timeText: {
    fontFamily: "Lato-SemiBold",
    color: "#7F7E78",
    fontSize: 12,
  },
  reviewText: {
    fontFamily: "Lato-Regular",
    color: "#1A1A1A",
    fontSize: 14,
  },
  reviewContainer: {},
  imageContainer: {
    marginTop: 10,
  },
  imageContainerStyle: {
    gap: 10,
  },
  iconContainer: {
    borderRadius: 4,
    padding: 3,
    backgroundColor: "#FF462D",
  },
  foodImage: {
    borderRadius: 12,
    width: 150,
    height: 100,
  },
});
