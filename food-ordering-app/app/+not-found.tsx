import React from "react";
import { View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";

const NotFoundScreen = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Ionicons name="alert-circle-outline" size={84} color="#FE8C00" />

        <Text className="mt-6 text-3xl font-bold text-gray-900">
          Page not found
        </Text>
        <Text className="mt-2 text-center text-base text-gray-500">
          The page you are looking for doesn’t exist or was moved.
        </Text>

        <View className="mt-6 flex-row items-center gap-3">
          <Button
            title="Go Home"
            size="md"
            textClassName="text-white"
            className="bg-[#FE8C00] rounded-full px-5"
            iconLeft="home-outline"
            onPress={() => router.replace("/(tabs)")}
          />
          <Button
            title="Go Back"
            size="md"
            textClassName="text-gray-800"
            className="bg-gray-100 rounded-full px-5"
            iconLeft="arrow-back"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </>
  );
}
export default NotFoundScreen;