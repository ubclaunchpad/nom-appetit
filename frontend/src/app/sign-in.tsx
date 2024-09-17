import { router } from "expo-router";
import { Text, View } from "react-native";
import { useSession } from "../context/SessionContext";

export default function SignIn() {
  const { onLogin, authState } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={async () => {
          await onLogin("admin", "password");
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text>
    </View>
  );
}