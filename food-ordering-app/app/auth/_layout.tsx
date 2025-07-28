import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerShown: false }} />
      <Stack.Screen name="forgetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="newPassword" options={{ headerShown: false }} />
    </Stack>
  );
};
export default AuthLayout;
