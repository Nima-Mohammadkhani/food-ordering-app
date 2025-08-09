import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { login } from "@/redux/slice/auth";
import { RootState } from "@/type";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string | undefined>();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const { t } = useTranslation();

  const loginUser = async () => {
    if (user && user.isRegistered) {
      if (user.userName === username && user.password === password) {
        dispatch(login({ username, password, isRegistered: "true" }));
        Toast.show({ type: "success", text1: t("auth.loginSuccess") });
        router.replace("/(tabs)");
      } else {
        Toast.show({ type: "error", text1: t("auth.invalidCredentials") });
      }
    } else {
      Toast.show({ type: "error", text1: t("auth.registerFirst") });
    }
  };
  const forgetPassword = () => {
    if (user && user.isRegistered) {
      router.push("/auth/forgetPassword");
    } else {
      Toast.show({ type: "error", text1: t("auth.registerFirst") });
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <View className="flex-1 flex flex-col gap-8 px-6 justify-center">
        <View className="mb-6">
          <Text className="text-4xl font-bold text-black">{t("auth.loginTitle1")}</Text>
          <Text className="text-4xl font-bold text-black mb-2">{t("auth.loginTitle2")}</Text>
          <Text className="text-base text-gray-500">{t("auth.loginSubtitle")}</Text>
        </View>

        <View className="gap-4">
          <Input label={t("auth.username")} value={username} onChangeText={setUsername} />
          <Input
            label={t("auth.password")}
            value={password}
            onChangeText={setPassword}
            secureToggle
            secureTextEntry
          />
          <Text
            onPress={forgetPassword}
            className="text-right text-sm text-[#FE8C00]"
          >
            {t("auth.forgotPassword")}
          </Text>
          <Button
            title={loading ? t("auth.loggingIn") : t("auth.login")}
            size="md"
            textClassName="text-white"
            className="bg-[#FE8C00] rounded-full"
            disabled={!(username && password) || loading}
            onPress={loginUser}
          />
        </View>

        <View className="flex-row items-center">
          <View className="flex-1 h-px bg-neutral-300" />
          <Text className="mx-4 text-neutral-500 text-sm">{t("auth.orSignInWith")}</Text>
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
          <Text>{t("auth.noAccountQuestion")}</Text>
          <Text
            onPress={() => router.push("/auth/register")}
            className="text-[#FE8C00] font-medium"
          >
            {t("auth.register")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
