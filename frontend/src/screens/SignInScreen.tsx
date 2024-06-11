import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Images from "../images/Images";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "signIn">;

export default function SignInScreen({ navigation }: Props) {
  const [isCreatingAccount, setCreatingAccount] = useState(true);

  return (
    <SafeAreaView style={{ backgroundColor: "#e6efd9" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "position"}
      >
        <View style={style.container}>
          <View style={style.header}>
            <View style={style.titleMessage}>
              <Text allowFontScaling={false} style={style.textHeader1}>
                Welcome to
              </Text>
              <Text allowFontScaling={false} style={style.textHeader2}>
                Nom Appetit
              </Text>
            </View>
            <Image source={Images.pandaBamboo} style={style.logo} />
          </View>

          <View style={style.slidingButton}>
            {isCreatingAccount ? (
              <>
                <Pressable style={style.activeButton}>
                  <Text>Create Account</Text>
                </Pressable>
                <Pressable
                  onPress={() => setCreatingAccount(!isCreatingAccount)}
                  style={style.inactiveButton}
                >
                  <Text>Sign In</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  onPress={() => setCreatingAccount(!isCreatingAccount)}
                  style={style.inactiveButton}
                >
                  <Text>Create Account</Text>
                </Pressable>
                <Pressable style={style.activeButton}>
                  <Text>Sign In</Text>
                </Pressable>
              </>
            )}
          </View>

          {isCreatingAccount ? (
            <>
              <View style={style.inputContainer}>
                <Text style={style.textHeader1}>Your name</Text>
                <TextInput style={style.input} placeholder="Your name" />
                <Text style={style.textHeader1}>Email address</Text>
                <TextInput style={style.input} placeholder="Email Address" />
                <Text style={style.textHeader1}>Create password</Text>
                <TextInput style={style.input} placeholder="Create Password" />
                <Text style={style.textHeader1}>Confirm password</Text>
                <TextInput style={style.input} placeholder="Confirm Password" />
              </View>

              <Pressable
                onPress={() => navigation.navigate("home")}
                style={style.actionButton}
              >
                <Text>Create account</Text>
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "90%",
                  margin: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "black",
                  }}
                />
                <View>
                  <Text
                    style={{
                      width: 100,
                      textAlign: "center",
                      marginHorizontal: 20,
                    }}
                  >
                    or sign up with
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "black",
                  }}
                />
              </View>
              <View style={style.signInOptions}>
                <Pressable style={style.optionButtons}>
                  <Image source={Images.facebook_ic} />
                </Pressable>
                <Pressable style={style.optionButtons}>
                  <Image source={Images.google_ic} />
                </Pressable>
                <Pressable style={style.optionButtons}>
                  <Image source={Images.apple_ic} />
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <View style={style.inputContainer}>
                <Text style={style.textHeader1}>Username</Text>
                <TextInput style={style.input} placeholder="Username" />
                <Text style={style.textHeader1}>Password</Text>
                <TextInput style={style.input} placeholder="Password" />
                <Text
                  style={{
                    textAlign: "right",
                  }}
                >
                  Forgot Password?
                </Text>
              </View>

              <Pressable
                onPress={() => navigation.navigate("home")}
                style={style.actionButton}
              >
                <Text>Sign In</Text>
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "90%",
                  margin: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "black",
                  }}
                />
                <View>
                  <Text
                    style={{
                      width: 100,
                      textAlign: "center",
                      marginHorizontal: 20,
                    }}
                  >
                    or login with
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "black",
                  }}
                />
              </View>
              <View style={style.signInOptions}>
                <Pressable style={style.optionButtons}>
                  <Image source={Images.facebook_ic} />
                </Pressable>
                <Pressable style={style.optionButtons}>
                  <Image source={Images.google_ic} />
                </Pressable>
                <Pressable style={style.optionButtons}>
                  <Image source={Images.apple_ic} />
                </Pressable>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e6efd9",
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },

  titleMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  textHeader1: { fontSize: 16 },
  textHeader2: { fontSize: 32 },
  logo: { width: 125, height: 125 },

  slidingButton: {
    width: 364,
    height: 48,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 12,
    padding: 4,
    gap: 7.5,
    marginTop: 40,
  },
  activeButton: {
    backgroundColor: "#f3cc91",
    width: 172,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  inactiveButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 172,
    height: 40,
    borderRadius: 12,
  },
  inputContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginVertical: 20,
  },
  input: {
    width: 364,
    height: 48,
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#9cb7b1",
    marginVertical: 5,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 175,
    height: 44,
    backgroundColor: "#f3cc91",
    borderRadius: 12,
  },
  signInOptions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  optionButtons: {
    justifyContent: "center",
    alignItems: "center",
    width: 115,
    height: 61,
    borderRadius: 8,
    backgroundColor: "white",
  },
});
