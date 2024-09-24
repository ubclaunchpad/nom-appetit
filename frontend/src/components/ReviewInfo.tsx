import { Divider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import ImageView from "react-native-image-viewing";

interface ReviewInfoProps {
  user_id: string;
  rating: number;
  review: string;
  image_urls: string[];
  profile_picture: string;
  user_name: string;
  user_total_reviews: number;
  user_total_saved: number;
  picture_id: string;
}

const generateFullStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <View key={i} style={styles.iconContainer}>
        <Icon name="star" type="font-awesome" color="#FFFFFF" size={14} />
      </View>
    );
  }
  return stars;
};

export const ReviewInfo = (props: ReviewInfoProps) => {
  const [visible, setIsVisible] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openImage = (index: number) => {
    setImageArray([]);
    for (const imageURL of props.image_urls) {
      const imageDict = {
        uri: imageURL,
      };
      setImageArray((prevArray) => [...prevArray, imageDict]);
    }
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar source={{ uri: props.profile_picture }} size={34} avatarStyle={styles.avatar} />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.name}>{props.user_name}</Text>
          <View style={styles.infoTextContainer}>
            <View style={styles.profileInfo}>
              <Icon name="account-box" type="material-community" color="#7F7E78" size={14} />
              <Text style={styles.reviewsNum}>{props.user_total_reviews}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Icon name="star-box" type="material-community" color="#7F7E78" size={14} />
              <Text style={styles.reviewsNum}>{props.user_total_saved}</Text>
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
      {props.image_urls && props.image_urls.length > 0 && (
        <ScrollView style={styles.imageContainer} contentContainerStyle={styles.imageContainerStyle} horizontal>
          {props.image_urls.map((imageUri, index) => (
            <Pressable key={index} onPress={() => openImage(index)}>
              <Image source={{ uri: imageUri }} style={styles.foodImage} />
            </Pressable>
          ))}
        </ScrollView>
      )}
      <ImageView images={imageArray} imageIndex={selectedImageIndex} visible={visible} onRequestClose={() => setIsVisible(false)} />
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
    width: 34,
    height: 34,
    borderRadius: 20,
  },
  blankAvatar: {
    width: 34,
    height: 34,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#A7A9AD",
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
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  starsTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
    gap: 5,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  iconContainer: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    backgroundColor: "#FF462D",
  },
  reviewTextContainer: {},
  reviewText: {
    fontFamily: "GT-America-Standard-Regular",
    color: "#1A1A1A",
    fontSize: 14,
  },
  reviewsNum: {
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 14,
    color: "#7F7E78",
  },
  imageContainer: {
    marginTop: 8,
  },
  imageContainerStyle: {
    gap: 10,
  },
  foodImage: {
    width: 115,
    height: 75,
    borderRadius: 8,
  },
});
