import { Stack } from "expo-router";

const RestaurantLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="restaurantDisplay" />
      <Stack.Screen name="reviews" />
      <Stack.Screen name="menu" />
    </Stack>
  );
};

export default RestaurantLayout;
