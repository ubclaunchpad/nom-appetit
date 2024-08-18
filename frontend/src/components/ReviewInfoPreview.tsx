import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";

interface ReviewInfoPreviewProps {
  name: string;
  reviews: number;
  photos: number;
  rating: number;
  time: string;
  description: string;
  profilePicture: string;
}

export const ReviewInfoPreview = (props: ReviewInfoPreviewProps) => {
  const truncateName = (name: string) => {
    return name.length > 25 ? `${name.substring(0, 22)}...` : name;
  };

  const generateFullStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return Array(fullStars)
      .fill(null)
      .map((_, i) => <Icon key={i} name="star" type="font-awesome" color="#F9BC60" size={12} />);
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
        <Avatar rounded source={{ uri: props.profilePicture }} size={32} />
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
      <Text numberOfLines={2} style={styles.reviewText}>
        {props.description}
      </Text>
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
  rightProfile: {
    paddingLeft: 10,
  },
  name: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
  },
  infoTextContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  infoText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
  },
  starsTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 5
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2.5,
  },
  timeText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
  },
  reviewText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
  },
});
