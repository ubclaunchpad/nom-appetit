import Navigation from "@components/Navigation";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { ref, uploadBytesResumable } from "firebase/storage";
import { FIREBASE_STORAGE } from "firebaseConfig";
import React, { useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "src/context/SessionContext";
import { v4 as uuidv4 } from "uuid";

export default function AddReview() {
  const { onLogout } = useSession();
  const [review, setReview] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [rating, setRating] = useState(0);
  const [imagesSelected, setImagesSelected] = useState(false);
  const { restaurant_id, name, image_url } = useLocalSearchParams();
  const maxRating = 5;

  const pickImage = async () => {
    setImagesSelected(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      let selectedImageUris = result.assets.map((asset) => asset.uri);
      if (selectedImageUris.length > 3) {
        Alert.alert("Limit Reached", "You can only select up to 3 images.");
        selectedImageUris = [];
        setImagesSelected(true);
      }
      setPostImage(selectedImageUris);
    }
  };

  const createReview = async () => {
    try {
      if (rating == 0) {
        Alert.alert("Error", "Please provide a valid rating.");
        return;
      }
      const picture_id = uuidv4();
      if (postImage.length != 0) {
        let index = 0;
        for (const image of postImage) {
          const response = await fetch(image);
          const blob = await response.blob();
          const path = `reviews/${restaurant_id}/${picture_id}/${index}`;
          const storageRef = ref(FIREBASE_STORAGE, path);
          await uploadBytesResumable(storageRef, blob);
          index++;
        }
      }
      const data = {
        restaurant_id: restaurant_id,
        name: name,
        image_url: image_url,
        rating: rating,
        review: review,
        picture_id: picture_id
      };
      const response = await axios.post(process.env.EXPO_PUBLIC_SERVER_URL + "/createReview", data);
      const { invalid_token } = await response.data;
      if (invalid_token) {
        Alert.alert("Error", "Your session expired. Please log in again.");
        onLogout();
        router.replace("../../");
      }
    } catch (error) {
      console.error(error.message);
    }
    router.back();
  }

  return (
    <View style={styles.main}>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.navigationContainer}>
        <Navigation leftIcon="arrow-left" leftNavigationOnPress={() => router.back()} />
      </SafeAreaView>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>How would you rate your experience?</Text>
          <View style={styles.ratings}>
            {[...Array(maxRating)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}
                style={[styles.iconContainer, index < rating ? { backgroundColor: "#FF462D" } : { backgroundColor: "#C8C8C8" }]}
              >
                <Icon name="star" type="font-awesome" color="#FFFFFF" size={20} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Tell us about your experience</Text>
          <TextInput
            style={styles.input}
            placeholder="Write your review here..."
            value={review}
            onChangeText={setReview}
            placeholderTextColor={"#C8C8C8"}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Pressable onPress={pickImage} style={styles.pickImage}>
            {imagesSelected ? (
              <FlatList
                horizontal
                data={postImage}
                keyExtractor={(item, index) => item.uri + index.toString()}
                renderItem={({ item }) => (
                  <View style={{ justifyContent: "center", marginHorizontal: 5 }}>
                    <Image source={{ uri: item }} style={{ width: 70, height: 70, borderRadius: 8 }} />
                  </View>
                )}
              />
            ) : (
              <Icon name="photo-camera" type="material" color="#C8C8C8" size={40} />
            )}
          </Pressable>
        </View>
        <Button
          title="Post Review"
          onPress={createReview}
          buttonStyle={{ backgroundColor: "#1A1A1A" }}
          containerStyle={{
            width: "100%",
            borderRadius: 8,
          }}
          titleStyle={{
            fontFamily: "GT-America-Standard-Regular",
            fontSize: 14,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 30,
  },
  navigationContainer: {
    paddingTop: 20
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
    gap: 10,
  },
  title: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 16,
    color: "#1A1A1A",
  },
  input: {
    fontFamily: "GT-America-Standard-Regular",
    height: 250,
    borderColor: "#C8C8C8",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  iconContainer: {
    borderRadius: 5,
    justifyContent: "center",
    width: 26,
    height: 26,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  pickImage: {
    borderWidth: 1,
    borderRadius: 5,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: "#C8C8C8",
  },
});
