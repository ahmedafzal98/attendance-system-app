import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import toastConfig from "../components/toastConfig";

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;
