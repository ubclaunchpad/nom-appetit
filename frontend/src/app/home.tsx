import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { token } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Text>{token}</Text>
    </SafeAreaView>
  );
}
