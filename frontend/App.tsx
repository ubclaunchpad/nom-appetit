import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useFonts} from 'expo-font';
/*
If you get any errors with the drawer import, try running the following commands in the frontend directory:

$ npm install @react-navigation/drawer
$ npm install react-native-gesture-handler react-native-reanimated
*/

import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import SelectedScreen from "./src/screens/SelectedScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SuggestScreen from "./src/screens/SuggestRestaurantScreen";
import ViewRestaurantScreen from "./src/screens/ViewRestaurantScreen";
import ResultScreen from "./src/screens/ResultScreen";
import ForgotPassword from "./src/screens/ForgotPasswordScreen";
import CreateAccountScreen from './src/screens/createAccountScreen';
import SearchFriends from './src/screens/SearchFriendsScreen';
import loadAssets from "./src/hooks/loadAssets";
import { RootStackParamList } from 'src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const isLoaded = loadAssets();

  if (!isLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="signIn" component={SignInScreen}/>
        <Stack.Screen name="home" component={HomeScreen}/>
        <Stack.Screen name="result" component={ResultScreen}/>
        <Stack.Screen name="search" component={SearchScreen}/>
        <Stack.Screen name="selected" component={SelectedScreen}/>
        <Stack.Screen name="suggest" component={SuggestScreen}/>
        <Stack.Screen name="view" component={ViewRestaurantScreen}/>
        <Stack.Screen name="forgotPassword" component={ForgotPassword}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}