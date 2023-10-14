import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Search from "./src/screens/SearchScreen";
import Selected from "./src/screens/SelectedScreen";
import Signup from "./src/screens/SignupScreen";
import Suggest from "./src/screens/SuggestRestaurantScreen";
import ViewRestaurantScreen from "./src/screens/ViewRestaurantScreen";
import Result from "./src/screens/ResultScreen"

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Result" component={Result}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Selected" component={Selected}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Suggest" component={Suggest}/>
        <Stack.Screen name="View" component={ViewRestaurantScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

