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
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
const NewPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [password, setPassword] = useState<string | undefined>();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />

      <View className="flex-1 px-6">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center gap-6">
            <View>
              <Text className="text-4xl font-bold text-black mb-2">
                Reset Password
              </Text>
              <Text className="text-base text-gray-500">
                Your new password must be different from the previously used
                password
              </Text>
            </View>
            <View className="gap-4">
              <Input
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <Input
                label="Confirm Password"
                secureToggle
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View className="pb-6 pt-4">
            <Button
              title="Continue"
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

export default NewPassword;
