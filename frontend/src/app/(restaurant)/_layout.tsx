import { Stack } from "expo-router";

const RestaurantLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="restaurant_display" />
      <Stack.Screen name="reviews" />
    </Stack>
  );
};

export default RestaurantLayout;