import React, { forwardRef, useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InputProps } from "@/type";
import { useTranslation } from "react-i18next";

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      secureTextEntry,
      secureToggle = false,
      containerClassName = "",
      inputClassName = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(secureTextEntry);
    const { i18n } = useTranslation();
    return (
      <View className={`w-full mb-4 ${containerClassName}`}>
        {label && <Text className="mb-1 text-gray-700">{label}</Text>}

        <View
          className={`flex-row items-center border rounded-lg px-3 ${
            isFocused ? "border" : "border-gray-300"
          } ${error ? "border-red-500" : ""}`}
        >
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={20}
              color={isFocused ? "#2563EB" : "#9CA3AF"}
              style={{ marginRight: 8 }}
            />
          )}

          <TextInput
            className={`flex-1 py-2 text-base ${inputClassName}`}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={hidePassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={ref}
            {...props}
          />

          {secureToggle && (
            <Pressable onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "eye-off" : "eye"}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          )}

          {!secureToggle && rightIcon && (
            <Ionicons
              name={rightIcon}
              size={20}
              color={isFocused ? "#2563EB" : "#9CA3AF"}
            />
          )}
        </View>

        {error && <Text className="mt-1 text-red-500 text-sm">{error}</Text>}
      </View>
    );
  }
);
Input.displayName = "Input";
export default Input;
