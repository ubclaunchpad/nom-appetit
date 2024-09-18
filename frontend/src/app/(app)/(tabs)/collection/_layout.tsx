// app/(tabs)/_layout.tsx
import { Stack, Tabs } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="saved_restaurants" />
    </Stack>
  );
};

export default Layout;
