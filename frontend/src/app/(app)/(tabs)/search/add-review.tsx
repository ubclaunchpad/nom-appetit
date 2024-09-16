import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, Pressable, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native-elements";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { FIREBASE_STORAGE } from "firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

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

      <View style={styles.container}>
        {[...Array(maxRating)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <Text style={[styles.star, index < rating && styles.filledStar]}>★</Text>
          </TouchableOpacity>
        ))}
        <Text>{rating}</Text>
      </View>

      <FlatList
        horizontal
        data={postImage}
        keyExtractor={(item, index) => item.uri + index.toString()}
        renderItem={({ item }) => (
          <View style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row" }}>
            <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
          </View>
        )}
      />

      <Pressable onPress={pickImage}>
        <Text>Pick Images</Text>
      </Pressable>
      <Pressable onPress={createReview}>
        <Text>Submit</Text>
      </Pressable>

      {/* Conditionally show ActivityIndicator and Text */}
      {isLoading && (
        <View style={[styles.container]}>
          <ActivityIndicator />
          <ActivityIndicator size="large" />
          <ActivityIndicator size="small" color="#0000ff" />
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
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
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 150,
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
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
});
