// app/(tabs)/_layout.tsx
import { Stack, Tabs } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="saved-page" />
      <Stack.Screen name="restaurant" />
      <Stack.Screen name="add-review" />
    </Stack>
  );
};

export default Layout;
