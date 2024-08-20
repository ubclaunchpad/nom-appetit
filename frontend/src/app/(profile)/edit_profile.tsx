import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { router } from "expo-router";
import { Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import Navigation from "@components/Navigation";

const EditProfile = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={{ marginTop: 10, width: 334 }}>
        <Navigation
          leftIcon="arrow-left"
          rightIcon="home"
          leftNavigationOnPress={() => router.back()}
        />
      </View>
      <Text style={styles.title}>Edit Profile</Text>
      <Pressable onPress={() => pickImage()}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.image} />
          </>
        ) : (
          <View style={styles.imageBackground}>
            <FontAwesome name="user" size={52} color="white" />
          </View>
        )}
        <FontAwesome
          name="camera"
          size={32}
          color="#004643"
          style={{ position: "absolute", bottom: 10, left: 90 }}
        />
      </Pressable>

      <View style={styles.inputContent}>
        <Input
          placeholder="Name"
          placeholderTextColor="#0046434D"
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Username"
          placeholderTextColor="#0046434D"
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Bio"
          placeholderTextColor="#0046434D"
          inputStyle={styles.bio}
          inputContainerStyle={styles.bioContainer}
          multiline
        />
      </View>
      <Pressable
        style={styles.saveContainer}
        onPress={() => {
          router.push("(profile)/profile");
        }}
      >
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100%",
    minHeight: "100%",
    backgroundColor: "#E6EFD9",
    gap: 20,
  },

  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F846E8F",
    borderRadius: 125 / 2,
    width: 125,
    height: 125,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
  },

  title: {
    fontFamily: "Lato",
    fontWeight: 600,
    fontSize: 24,
    color: "#004643",
  },

  inputContent: {
    width: "90%",
  },

  input: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "Lato",
  },
  inputContainer: {
    borderBottomWidth: 0,
    borderRadius: 12,
    backgroundColor: "white",
  },
  bio: {
    padding: 15,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "Lato",
    textAlignVertical: "top",
    minHeight: 200,
  },
  bioContainer: {
    borderBottomWidth: 0,
    borderRadius: 12,
    backgroundColor: "white",
  },

  saveText: {
    fontSize: 16,
    fontFamily: "Lato",
    color: "#004643",
  },
  saveContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3CC91",
    minHeight: 40,
    minWidth: 184,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
});

export default EditProfile;
