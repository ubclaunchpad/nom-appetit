import Images from "@assets/images";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";

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
  const truncateName = (name: string) => {
    return name.length > 25 ? `${name.substring(0, 22)}...` : name;
  };

  const generateFullStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return Array(fullStars)
      .fill(null)
      .map((_, i) => <Icon key={i} name="star" type="font-awesome" color="#F9BC60" size={16} />);
  };

  const generateHalfStar = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = Number((rating - fullStars).toFixed(1));
    if (halfStar >= 0.4 && halfStar <= 0.5) {
      return <Icon name="star-half-o" type="font-awesome" color="#F9BC60" size={16} />;
    } else if (halfStar > 0.5) {
      return <Icon name="star" type="font-awesome" color="#F9BC60" size={16} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar rounded source={{ uri: props.profilePicture }} size={42} />
        <View style={styles.rightProfile}>
          <Text style={styles.name}>{truncateName(props.name)}</Text>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              {props.reviews} reviews · {props.photos} photos
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.starsTimeContainer}>
        <View style={styles.starsContainer}>
          {generateFullStars(props.rating)}
          {generateHalfStar(props.rating)}
        </View>
        <Text style={styles.timeText}>{props.time}</Text>
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
    backgroundColor: "#FFFEFA",
    padding: 30,
    borderRadius: 12
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightProfile: {
    paddingLeft: 10,
  },
  name: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
  },
  infoTextContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  infoText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
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
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
  },
  reviewText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
  reviewContainer: {
  },
  imageContainer: {
    marginTop: 20,
  },
  imageContainerStyle: {
    gap: 10
  },
  foodImage: {
    borderRadius: 12,
    width: 150,
    height: 100,
  },
});
