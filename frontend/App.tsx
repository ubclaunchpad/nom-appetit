import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerItem  } from '@react-navigation/drawer';
import {useFonts} from 'expo-font';
/*
If you get any errors with the drawer import, try running the following commands in the frontend directory:

$ npm install @react-navigation/drawer
$ npm install react-native-gesture-handler react-native-reanimated
*/

import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Search from "./src/screens/SearchScreen";
import Selected from "./src/screens/SelectedScreen";
import Signup from "./src/screens/SignupScreen";
import Suggest from "./src/screens/SuggestRestaurantScreen";
import ViewRestaurantScreen from "./src/screens/ViewRestaurantScreen";
import Result from "./src/screens/ResultScreen";
import ForgotPassword from "./src/screens/ForgotPasswordScreen";
import CreateAccountScreen from './src/screens/createAccountScreen';
import SearchFriends from './src/screens/SearchFriendsScreen';

const Stack = createNativeStackNavigator();

// const RootNavigator = createNativeStackNavigator({
//   Login: { screen: LoginScreen ,
//            navigationBarStyle : {navBarHidden: true },
//            navigationOptions: {
//            headerShown: false,
//            }
//   },
//   AfterLogin: { screen: MyDrawerNavigator,
//     navigationBarStyle : {navBarHidden: true },
//     navigationOptions: {
//       headerShown: false,
//     } },
// });

export default function App() {
  const [loaded] = useFonts({
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Result" component={Result}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Selected" component={Selected}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Suggest" component={Suggest}/>
        <Stack.Screen name="View" component={ViewRestaurantScreen}/>
        <Stack.Screen name="Forgot Password" component={ForgotPassword}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}