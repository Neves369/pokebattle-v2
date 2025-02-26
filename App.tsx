import Routes from "./routes";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [loaded, error] = useFonts({
    Aldrich: require("./assets/fonts/Aldrich-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
