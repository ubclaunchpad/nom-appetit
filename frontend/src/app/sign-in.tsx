import { router } from "expo-router";
import { Text, View, TextInput } from "react-native";
import { useSession } from "../context/SessionContext";
import InputForm from "@components/InputForm";
import { useState } from "react";

export default function SignIn() {
  const { onLogin, authState } = useSession();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFoundMessage, setUserNotFoundMessage] = useState("");
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <InputForm
        value={name}
        onChangeText={setName}
        placeholder="Username"
        errorMessage={userNotFoundMessage}
        autoCapitalize="none"
        secureTextEntry={false}
      />
      <InputForm
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        errorMessage={invalidPasswordMessage}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Text
        onPress={async () => {
          await onLogin(name, password);
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/(tabs)");
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
