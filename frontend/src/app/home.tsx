import axios from "axios";
import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { token } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Text>{token}</Text>
      <Link href="(profile)/profile" style={{ fontSize: 5 }}>
        Profile
      </Link>
    </SafeAreaView>
  );
}
