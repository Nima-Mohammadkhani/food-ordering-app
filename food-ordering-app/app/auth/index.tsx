import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const { t } = useTranslation();
  const onboarding: { title: string; description: string; image: ImageSourcePropType }[] = useMemo(
    () => [
      {
        title: t("auth.onboarding.1.title"),
        description: t("auth.onboarding.1.description"),
        image: require("../../assets/images/onboarding/onboarding.png"),
      },
      {
        title: t("auth.onboarding.2.title"),
        description: t("auth.onboarding.2.description"),
        image: require("../../assets/images/onboarding/onboarding2.png"),
      },
      {
        title: t("auth.onboarding.3.title"),
        description: t("auth.onboarding.3.description"),
        image: require("../../assets/images/onboarding/onboarding3.png"),
      },
    ],
    [t]
  );

  const current = onboarding[step];
  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <View className="relative flex-1">
        <Image
          source={current.image}
          className="flex-1 w-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 p-10">
          <View className="flex flex-col gap-5 p-6 rounded-3xl shadow-lg bg-[#FE8C00]">
            <Text className="text-white text-3xl font-semibold text-center mb-3">
              {current.title}
            </Text>
            <Text className="text-white text-base text-center mb-6 leading-6">
              {current.description}
            </Text>
            <View className="flex-row justify-center gap-2 mt-4 space-x-2">
              {onboarding.map((_, index) => (
                <View
                  key={index}
                  className={`w-4 h-2 rounded-lg ${
                    step === index ? "bg-white" : "bg-orange-300"
                  }`}
                />
              ))}
            </View>
            <View
              className={`flex flex-row ${
                step == 0 ? "justify-end" : "justify-between"
              }`}
            >
              <Button
                title={t("common.back")}
                iconLeft="arrow-back"
                className={`bg-transparent text-white ${
                  step == 0 ? "hidden" : "block"
                }`}
                textClassName="text-white font-bold"
                onPress={() => setStep((prev) => prev - 1)}
              />
              <Button
                title={t("common.next")}
                iconRight="arrow-forward"
                className="bg-transparent text-white"
                textClassName="text-white font-bold"
                onPress={() => {
                  if (step < onboarding.length - 1) {
                    setStep((prev) => prev + 1);
                  } else {
                    router.push("/auth/login");
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
