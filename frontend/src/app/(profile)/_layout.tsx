import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="edit_profile" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="saved_restaurants" />
    </Stack>
  );
};

export default ProfileLayout;
