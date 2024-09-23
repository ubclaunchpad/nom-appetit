import { View, Text } from "react-native";
import React, { useState } from "react";
import InputForm from "@components/InputForm";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const postData = () => {
    return;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <InputForm
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        autoCapitalize="words"
        secureTextEntry={false}
      />
      <InputForm
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        errorMessage={emailValidation}
        autoCapitalize="none"
        secureTextEntry={false}
      />

      <InputForm
        value={password}
        onChangeText={setPassword}
        placeholder="Create password"
        errorMessage={passwordValidation}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <InputForm
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        errorMessage={passwordValidation}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Text
        onPress={() => {
          postData();
        }}
      >
        Register
      </Text>
    </View>
  );
};

export default register;
