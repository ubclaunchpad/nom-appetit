import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router'; // Adjust this if you're using a different routing library
import { useSession } from "../../../context/SessionContext";

export default function SignOut() {
  const { onLogout } = useSession();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={async () => {
          await onLogout();
          // Navigate after logging out. You may want to tweak this to ensure logout is
          // successful before navigating.
          router.replace("/"); // Adjust the route as needed
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}