// app/(tabs)/_layout.tsx
import { Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="user_profile" />
        <Stack.Screen name="edit_profile" />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default Layout;
