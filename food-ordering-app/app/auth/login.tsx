import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { login } from "@/redux/slice/auth";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string | undefined>();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const loginUser = async () => {
    if (user && user.isRegistered) {
      if (user.userName === username && user.password === password) {
        dispatch(login({ username, password, isRegistered: "true" }));
        Toast.show({ type: "success", text1: "Login success" });
        router.replace("/(tabs)");
      } else {
        Toast.show({ type: "error", text1: "Invalid username or password" });
      }
    } else {
      Toast.show({ type: "error", text1: "Please register account first" });
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <View className="flex-1 flex flex-col gap-8 px-6 justify-center">
        <View className="mb-6">
          <Text className="text-4xl font-bold text-black">Login to your</Text>
          <Text className="text-4xl font-bold text-black mb-2">account.</Text>
          <Text className="text-base text-gray-500">
            Please sign in to your account
          </Text>
        </View>

        <View className="gap-4">
          <Input label="Username" value={username} onChangeText={setUsername} />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureToggle
            secureTextEntry
          />
          <Text
            onPress={() => router.push("/auth/forgetPassword")}
            className="text-right text-sm text-[#FE8C00]"
          >
            Forgot password?
          </Text>
          <Button
            title={loading ? "Logging in..." : "Login"}
            size="md"
            textClassName="text-white"
            className="bg-[#FE8C00] rounded-full"
            disabled={!(username && password) || loading}
            onPress={loginUser}
          />
        </View>

        <View className="flex-row items-center">
          <View className="flex-1 h-px bg-neutral-300" />
          <Text className="mx-4 text-neutral-500 text-sm">Or sign in with</Text>
          <View className="flex-1 h-px bg-neutral-300" />
        </View>

        <View className="flex-row justify-center gap-6">
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="logo-google" size={20} color="#DB4437" />
          </View>
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="logo-facebook" size={20} color="#1877F2" />
          </View>
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name="logo-apple" size={20} color="#000000" />
          </View>
        </View>

        <View className="flex-row justify-center gap-1">
          <Text>Don't have an account?</Text>
          <Text
            onPress={() => router.push("/auth/register")}
            className="text-[#FE8C00] font-medium"
          >
            Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
