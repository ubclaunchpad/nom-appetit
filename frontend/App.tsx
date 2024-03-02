import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useFonts} from 'expo-font';

import 'react-native-gesture-handler';
//import 'react-native-screens'; // npm install this
//import 'react-native-safe-area-context'; // npm install this
//import '@react-native-community/masked-view'; // npm install this
// npm i react-native-paper
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "./src/screens/HomeScreen";
import SearchRestaurantScreen from "./src/screens/SearchScreen";
import SelectedRestaurantScreen from "./src/screens/SelectedScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SuggestRestaurantScreen from "./src/screens/SuggestRestaurantScreen";
import ViewSavedRestaurantsScreen from "./src/screens/ViewRestaurantScreen";
import RestaurantResultScreen from "./src/screens/ResultScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import SearchFriendsScreen from './src/screens/SearchFriendsScreen';
import loadAssets from "./src/hooks/loadAssets";
import { RootStackParamList } from 'src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNav=()=>{
  const Stack = createNativeStackNavigator<RootStackParamList>();

  
}

export default function App() {

  const Drawer = createDrawerNavigator();
  const isLoaded = loadAssets();

  if (!isLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="signIn" component={SignInScreen}/>
        <Stack.Screen name="home" component={HomeScreen}/>
        <Stack.Screen name="restaurantResult" component={RestaurantResultScreen}/>
        <Stack.Screen name="searchRestaurant" component={SearchRestaurantScreen}/>
        <Stack.Screen name="selectedRestaurant" component={SelectedRestaurantScreen}/>
        <Stack.Screen name="suggestRestaurant" component={SuggestRestaurantScreen}/>
        <Stack.Screen name="viewSavedRestaurants" component={ViewSavedRestaurantsScreen}/>
        <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen name="searchFriends" component={SearchFriendsScreen}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}