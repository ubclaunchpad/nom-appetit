import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

export default function useCachedResources() {
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    async function loadAssetsAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
          ...FontAwesome.font,
        });
      } catch (e) {
        alert(e);
      } finally {
        setLoadStatus(true);
        SplashScreen.hideAsync();
      }
    }

    loadAssetsAsync();
  }, []);

  return isLoaded;
}