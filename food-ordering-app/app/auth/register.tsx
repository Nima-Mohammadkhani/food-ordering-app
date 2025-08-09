import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { login } from "@/redux/slice/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
const Register = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string | undefined>();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const registerUser = async () => {
    await dispatch(login({ email, userName, password, isRegistered: "true" }));
    Toast.show({ type: "success", text1: "Register success" });
    router.replace("/(tabs)");
  };
  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <View className="flex-1 flex flex-col gap-8 px-6 justify-center">
        <View className="mb-6">
          <Text className="text-4xl font-bold text-black">
            {t("auth.createYourNewAccount")}
          </Text>
          <Text className="text-4xl font-bold text-black mb-2">
            {t("auth.account")}
          </Text>
          <Text className="text-base text-gray-500">
            {t("auth.createAccountSubtitle")}
          </Text>
        </View>

        <View className="gap-4">
          <Input
            label={t("auth.email")}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label={t("auth.username")}
            value={userName}
            onChangeText={setUserName}
          />
          <Input
            label={t("auth.password")}
            secureToggle
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View className="flex flex-row justify-between items-center">
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => setChecked(!checked)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={checked ? "checkbox" : "square-outline"}
                size={24}
                color={checked ? "#FE8C00" : "#999"}
              />
            </TouchableOpacity>
            <Text className="text-right">
              {t("auth.iAgreeWith")}
              <Text className="text-[#FE8C00]">{t("auth.termsOfService")}</Text>{" "}
              {t("auth.and")}{" "}
              <Text className="text-[#FE8C00]">{t("auth.privacyPolicy")}</Text>
            </Text>
          </View>
          <Button
            title={t("auth.register")}
            size="md"
            textClassName="text-white"
            disabled={!(email && userName && password && checked)}
            className="bg-[#FE8C00] rounded-full mt-2"
            onPress={registerUser}
          />
        </View>

        <View className="flex-row items-center">
          <View className="flex-1 h-px bg-neutral-300" />
          <Text className="mx-4 text-neutral-500 text-sm">
            {t("auth.orRegisterWith")}
          </Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Register;
