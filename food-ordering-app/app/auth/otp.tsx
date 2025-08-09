import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const router = useRouter();
  const inputs = useRef<Array<TextInput | null>>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />

      <View className="flex-1 px-6">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center gap-6">
            <View className="mb-6 flex">
              <Text className="text-4xl font-bold text-black mb-2">
                {t("auth.emailVerification")}
              </Text>
              <Text className="text-base text-gray-500">
                {t("auth.enterCodeInfo")}
              </Text>
            </View>

            <View className="flex-row justify-between">
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  value={value}
                  onChangeText={(text) => handleChange(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  className="border border-gray-300 w-14 h-16 text-center text-xl rounded-md"
                />
              ))}
            </View>

            <View className="flex justify-center items-center gap-4">
              <View className="justify-center gap-1">
                <Text className="text-gray-500">
                  {t("auth.didntReceiveCodeQuestion")}
                </Text>
                <Text className="text-[#FE8C00] ml-1 font-medium">
                  {t("auth.resend")}
                </Text>
              </View>
              <Text className="text-gray-500 text-base">
                00:{timer < 10 ? `0${timer}` : timer}
              </Text>
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View className="pb-6 pt-4">
            <Button
              title={t("auth.continue")}
              size="md"
              textClassName="text-white "
              className="bg-[#FE8C00] rounded-full"
              onPress={() => router.push("/auth/newPassword")}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
