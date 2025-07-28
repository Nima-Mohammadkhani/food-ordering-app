import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Image, ImageSourcePropType } from "react-native";

const Index = () => {
  const [step, setStep] = useState<number>(0);
  const onboarding: {
    title: string;
    description: string;
    image: ImageSourcePropType;
  }[] = [
    {
      title: "We serve incomparable delicacies",
      description:
        " All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
      image: require("../../assets/images/onboarding/onboarding.png"),
    },
    {
      title: "We serve incomparable delicacies",
      description:
        " All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
      image: require("../../assets/images/onboarding/onboarding2.png"),
    },
    {
      title: "We serve incomparable delicacies",
      description:
        " All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
      image: require("../../assets/images/onboarding/onboarding.png"),
    },
  ];
  const current = onboarding[step];
  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View className="relative flex-1">
        <Image
          source={current.image}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 p-10">
          <View
            className="flex flex-col gap-5 p-6 rounded-3xl shadow-lg"
            style={{ backgroundColor: "#FE8C00" }}
          >
            <Text className="text-white text-3xl font-semibold text-center mb-3">
              {current.title}
            </Text>
            <Text className="text-white text-base text-center mb-6 leading-6">
              {current.description}
            </Text>
            <View
              className={`flex flex-row ${
                step == 0 ? "justify-end" : "justify-between"
              }`}
            >
              <Button
                title="Back"
                iconLeft="arrow-back"
                variant="primary"
                className={`bg-transparent py-3 ${
                  step == 0 ? "hidden" : "block"
                }`}
                textClassName="text-orange-500 font-bold"
                onPress={() => setStep((prev) => prev - 1)}
              />
              <Button
                title="Next"
                iconRight="arrow-forward"
                variant="primary"
                className="bg-transparent py-3 "
                textClassName="text-orange-500 font-bold"
                onPress={() => setStep((prev) => prev + 1)}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
