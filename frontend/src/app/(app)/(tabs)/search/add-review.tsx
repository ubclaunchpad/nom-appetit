import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Button, Icon, Image } from "react-native-elements";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { FIREBASE_STORAGE } from "firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function AddReview() {
  const [review, setReview] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewID, setReviewID] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { restaurant_id } = useLocalSearchParams();
  const maxRating = 5;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedImageUris = result.assets.map((asset) => asset.uri);
      setPostImage(selectedImageUris);
    }
  };

  const createReview = async () => {
    try {
      setIsLoading(true);
      const review_id = uuidv4();
      console.log("UPLOADING IMAGE...");
      let index = 0;
      for (const image of postImage) {
        const response = await fetch(image);
        const blob = await response.blob();
        const path = `reviews/${review_id}/image-${index}`;
        const storageRef = ref(FIREBASE_STORAGE, path);
        await uploadBytesResumable(storageRef, blob);
        index++;
      }
      console.log("FINISHED UPLOADING IMAGE...");
      console.log("CREATING REVIEW...");
      const data = {
        review_id: review_id,
        restaurant_id: restaurant_id,
        review: review,
        rating: rating,
        date: new Date().toISOString(),
      };
      const response = await axios.post(process.env.EXPO_PUBLIC_SERVER_URL + "createReview", data);
      const { invalid_token } = response.data;
      if (invalid_token) {
        router.replace("/");
      } else {
        setIsLoading(false);
        console.log("FINISHED CREATING REVIEW...");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.title}>Add Review</Text>
        <TextInput style={styles.input} placeholder="Write your review here..." value={review} onChangeText={setReview} multiline />
      </View>

      <Text style={styles.title2}>How would you rate your experience?</Text>

      <View style={styles.ratingContainer}>
        {[...Array(maxRating)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <View style={styles.iconContainer}>
              <Icon name="star" type="font-awesome" color="#FFFFFF" size={23} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Pressable onPress={pickImage}>
        <Text>Pick Images</Text>
      </Pressable>

      <Button
        title="Submit"
        onPress={createReview}
        buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
        containerStyle={{
          width: "100%",
          borderRadius: 8,
        }}
        titleStyle={{
          fontFamily: "GT-America-Standard-Regular",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  star: {
    fontSize: 30,
    color: "#d3d3d3",
    marginHorizontal: 5,
  },
  filledStar: {
    color: "#FFD700",
  },
  loadingContainer: {
    marginTop: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
  iconContainer: {
    borderRadius: 5,
    justifyContent: "center",
    width:29,
    height: 29,
    backgroundColor: "#FF462D",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});
