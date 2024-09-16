import { Slot } from 'expo-router';
import { SessionProvider } from '../context/SessionContext';
import { useFonts } from "expo-font";
import { useEffect } from 'react';

export default function Root() {
  const [fontsLoaded] = useFonts({
    'GT-America-Standard-Regular': require('../../assets/fonts/GT-America-Standard-Regular.ttf'),
    'GT-America-Standard-Bold': require('../../assets/fonts/GT-America-Standard-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      console.log("LOADED FONTS");
    } else {
      return;
    }
  });

  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
