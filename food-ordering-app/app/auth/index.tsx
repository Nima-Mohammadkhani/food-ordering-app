import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

const Index = () => {
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const onboarding: {
    title: string;
    description: string;
    image: ImageSourcePropType;
  }[] = [
    {
      title: "Discover top restaurants near you",
      description:
        "Browse a wide range of local favorites and hidden gems. Find the food you love.",
      image: require("../../assets/images/onboarding/onboarding.png"),
    },
    {
      title: "Order in just a few\n taps",
      description:
        "Choose your meal, customize it, and place your order in seconds. No calls, no hassle.",
      image: require("../../assets/images/onboarding/onboarding2.png"),
    },
    {
      title: "Fast and secure delivery",
      description:
        "Track your order in real-time and enjoy hot meals delivered right to your door.",
      image: require("../../assets/images/onboarding/onboarding3.png"),
    },
  ];

  const current = onboarding[step];
  return (
    <SafeAreaView className="flex-1">
      <StatusBar />
      <View className="relative flex-1">
        <Image
          source={current.image}
          className="flex-1 w-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 p-10">
          <View
            className="flex flex-col gap-5 p-6 rounded-3xl shadow-lg bg-[#FE8C00]"
          >
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
                title="Back"
                iconLeft="arrow-back"
                variant="primary"
                className={`bg-transparent py-3 px-0 ${
                  step == 0 ? "hidden" : "block"
                }`}
                textClassName="text-orange-500 font-bold"
                onPress={() => setStep((prev) => prev - 1)}
              />
              <Button
                title="Next"
                iconRight="arrow-forward"
                variant="primary"
                className="bg-transparent py-3 px-0"
                textClassName="text-orange-500 font-bold"
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
