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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ForgotPassword = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<"whatsapp" | "email">(
    "whatsapp"
  );

  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && inputRef.current.focus) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setModalVisible(true);
  };

  const renderOption = (
    type: "whatsapp" | "email",
    label: string,
    value: string,
    iconName: keyof typeof Ionicons.glyphMap
  ) => {
    const isSelected = selectedMethod === type;

    return (
      <TouchableOpacity
        className={`flex-row items-center justify-between border rounded-xl px-4 py-3 mb-2 ${
          isSelected ? "border-[#FE8C00] bg-orange-50" : "border-gray-300"
        }`}
        onPress={() => setSelectedMethod(type)}
      >
        <View className="flex-row items-center gap-4">
          <Ionicons
            name={iconName}
            size={24}
            color={isSelected ? "#FE8C00" : "#999"}
          />
          <View>
            <Text className="text-sm text-gray-500">{label}</Text>
            <Text className="font-semibold text-black">{value}</Text>
          </View>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#FE8C00" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />

      <View className="flex-1 px-6">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center">
            <View className="mb-8">
              <Text className="text-4xl font-bold text-black mb-2">
                Forgot password?
              </Text>
              <Text className="text-base text-gray-500">
                Enter your email address and we'll send you confirmation code to
                reset your password
              </Text>
            </View>

            <View>
              <Input
                label="Email Address"
                ref={inputRef}
                autoFocus={true}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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
              onPress={handleContinue}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/30"
          onPress={() => setModalVisible(false)}
        />
        <View className="flex flex-col gap-2 absolute bottom-0 w-full bg-white rounded-t-3xl p-6">
          <Text className="text-lg font-bold text-black mb-2">
            Forgot password?
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Select which contact details should we use to reset your password
          </Text>

          {renderOption(
            "whatsapp",
            "Send via WhatsApp",
            "+12 8347 2838 28",
            "logo-whatsapp"
          )}
          {renderOption(
            "email",
            "Send via Email",
            "Albertstevano@gmail.com",
            "mail-outline"
          )}

          <Button
            title="Continue"
            size="md"
            textClassName="text-white"
            className="bg-[#FE8C00] text-white rounded-full"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ForgotPassword;
