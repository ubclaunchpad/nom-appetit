import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

/*
If you get any errors with the drawer import, try running the following commands in the frontend directory:

$ npm install @react-navigation/drawer
$ npm install react-native-gesture-handler react-native-reanimated
*/

import HomeScreen from "./src/screens/HomeScreen";
import SearchRestaurantScreen from "./src/screens/SearchScreen";
import SelectedRestaurantScreen from "./src/screens/SelectedScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SuggestRestaurantScreen from "./src/screens/SuggestRestaurantScreen";
import ViewSavedRestaurantsScreen from "./src/screens/ViewRestaurantScreen";
import RestaurantResultScreen from "./src/screens/ResultScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import SearchFriendsScreen from "./src/screens/SearchFriendsScreen";
import RestaurantFilterScreen from "./src/screens/RestaurantFilterScreen";
import loadAssets from "./src/hooks/loadAssets";
import { RootStackParamList } from "src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isLoaded = loadAssets();

  if (!isLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="signIn" component={SignInScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen
          name="restaurantResult"
          component={RestaurantResultScreen}
        />
        <Stack.Screen
          name="searchRestaurant"
          component={SearchRestaurantScreen}
        />
        <Stack.Screen
          name="selectedRestaurant"
          component={SelectedRestaurantScreen}
        />
        <Stack.Screen
          name="suggestRestaurant"
          component={SuggestRestaurantScreen}
        />
        <Stack.Screen
          name="viewSavedRestaurants"
          component={ViewSavedRestaurantsScreen}
        />
        <Stack.Screen
          name="filterRestaurant"
          component={RestaurantFilterScreen}
        />
        <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="searchFriends" component={SearchFriendsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
