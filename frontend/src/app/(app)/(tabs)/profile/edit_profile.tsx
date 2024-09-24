import { View, Text, StyleSheet, Pressable, Image, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Navigation from "@components/Navigation";
import axios from "axios";
import { FIREBASE_STORAGE } from "firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";

const EditProfile = () => {
  const { id, oldName, oldBio, oldImage } = useLocalSearchParams();
  const [image, setImage] = useState(oldImage);
  const [name, setName] = useState(oldName);
  const [bio, setBio] = useState(oldBio);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const editInfo = async () => {
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/editUserInfo`, { name, bio });

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(FIREBASE_STORAGE, `users/${id}.jpg`);
        uploadBytesResumable(storageRef, blob).then(() => router.back());
      } else {
        router.back();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={styles.safeArea}>
        <Navigation leftIcon="arrow-left" leftNavigationOnPress={() => router.back()} middleText="Edit Profile"/>
      </SafeAreaView>
      <View style={styles.innerContainer}>
        <Pressable onPress={pickImage}>
          <Image source={{ uri: image as string }} style={styles.image} />
          <FontAwesome name="camera" size={26} color="#1A1A1A" style={styles.cameraIcon} />
        </Pressable>
        <View style={styles.inputContent}>
          <InputRow label="Name" value={name} onChangeText={setName} multiline={false}/>
          <InputRow label="Bio" value={bio} onChangeText={setBio} multiline />
        </View>
        <Pressable style={styles.saveContainer} onPress={editInfo}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const InputRow = ({ label, value, onChangeText, multiline }) => (
  <View style={styles.inputRow}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={`Enter your ${label.toLowerCase()}`}
      placeholderTextColor="#7F7E78"
      style={[styles.inputContainer, multiline && styles.inputContainer]}
      multiline={multiline}
    />
  </View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#FFFFFF",
  },
  safeArea: {
    width: "100%",
    paddingTop: 20,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    left: 65,
  },
  title: {
    fontFamily: "GT-America-Standard-Bold",
    fontSize: 24,
    color: "#1A1A1A",
    marginBottom: 20,
  },
  inputContent: {
    width: '100%',
    marginTop: 20,
    marginBottom: 40,
    gap: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: "GT-America-Standard-Regular",
    fontSize: 14,
    color: "#1A1A1A",
    width: 60,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "GT-America-Standard-Regular",
  },
  saveText: {
    fontSize: 14,
    fontFamily: "GT-America-Standard-Bold",
    color: "#FFFFFF",
  },
  saveContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
  },
});

export default EditProfile;