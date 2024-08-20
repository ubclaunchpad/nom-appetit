import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="edit_profile" />
      <Stack.Screen name="find_friends" />
      <Stack.Screen name="friend_requests" />
      <Stack.Screen name="friends_list" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="saved_restaurants" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
};

export default ProfileLayout;
