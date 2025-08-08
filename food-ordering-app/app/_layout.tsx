import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/redux/slice/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, Redirect } from "expo-router";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import "../global.css";
import { RootState } from "@/type";

function RootLayoutInner() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        dispatch(loadUser(JSON.parse(userData)));
      }
    };

    loadUserData();
  }, [dispatch]);

  return (
    <>
      {!user ? <Redirect href="/auth" /> : <Redirect href="/(tabs)" />}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar hidden />
      <Toast />
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootLayoutInner />
      </PersistGate>
    </Provider>
  );
}
