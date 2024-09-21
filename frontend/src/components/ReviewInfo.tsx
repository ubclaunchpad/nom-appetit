import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import ImageView from "react-native-image-viewing";

import { ref, deleteObject, listAll } from "firebase/storage";
import { FIREBASE_STORAGE } from "firebaseConfig";

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
  const [editable, setEditable] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const compareUser = async () => {
      try {
        const { data } = await axios.get(
          process.env.EXPO_PUBLIC_SERVER_URL + "/compareUserID",
          {
            params: {
              current_id: props.user_id,
            },
          }
        );
        const same_id = data["same_id"];
        setEditable(same_id);
      } catch (e) {
        console.log(e.message);
      }
    };
    compareUser();
  }, []);

  const openImage = (index: number) => {
    setImageArray([]);
    for (const imageURL of props.images) {
      const imageDict = {
        uri: imageURL,
      };
      setImageArray((prevArray) => [...prevArray, imageDict]);
    }
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      process.env.EXPO_PUBLIC_SERVER_URL + "/removeReview",
      {
        params: {
          review_id: props.review_id,
        },
      }
    );
    console.log(response.data);
    console.log(props.review_id);
    const folderRef = ref(FIREBASE_STORAGE, "reviews/" + props.review_id + "/");
    listAll(folderRef).then((dir) => {
      dir.items.forEach((fileRef) => {
        const file = ref(
          FIREBASE_STORAGE,
          "reviews/" + props.review_id + "/" + fileRef.name
        );
        deleteObject(file)
          .then(() => {
            console.log("deleted");
          })
          .catch((e) => {
            console.log(e.message);
          });
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.profile}>
          <Avatar
            source={{ uri: props.profile_picture }}
            size={34}
            avatarStyle={styles.avatar}
          />
          <View style={styles.profileInfoContainer}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={styles.infoTextContainer}>
              <View style={styles.profileInfo}>
                <Icon
                  name="account-box"
                  type="material-community"
                  color="#7F7E78"
                  size={14}
                />
                <Text style={styles.reviewsNum}>{props.review_total}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Icon
                  name="star-box"
                  type="material-community"
                  color="#7F7E78"
                  size={14}
                />
                <Text style={styles.reviewsNum}>{props.saved_total}</Text>
              </View>
            </View>
          </View>
        </View>
        {editable && (
          <Pressable
            onPress={() => handleDelete()}
            style={{ marginRight: 10, marginTop: 5 }}
          >
            <Icon name="trash" type="font-awesome" color="#7F7E78" size={16} />
          </Pressable>
        )}
      </View>

      <View style={styles.starsTimeContainer}>
        <View style={styles.starsContainer}>
          {generateFullStars(props.rating)}
        </View>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewText}>{props.review}</Text>
      </View>
      {props.images && props.images.length > 0 && (
        <ScrollView
          style={styles.imageContainer}
          contentContainerStyle={styles.imageContainerStyle}
          horizontal
        >
          {props.images.map((imageUri, index) => (
            <Pressable key={index} onPress={() => openImage(index)}>
              <Image source={{ uri: imageUri }} style={styles.foodImage} />
            </Pressable>
          ))}
        </ScrollView>
      )}
      <ImageView
        images={imageArray}
        imageIndex={selectedImageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
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
    fontSize: 15,
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
  imageContainer: {
    marginTop: 15,
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
