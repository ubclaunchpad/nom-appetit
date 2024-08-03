import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="findFriends" />
      <Stack.Screen name="friendRequests" />
      <Stack.Screen name="friendsList" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="savedRestaurants" />
      <Stack.Screen name="searchFriends" />
    </Stack>
  );
};

export default ProfileLayout;
