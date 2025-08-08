import React, { useState } from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonProps } from "@/type";

const Button = ({
  title,
  onPress,
  variant = "",
  size = "",
  className = "",
  textClassName = "",
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  iconSize = 20,
  rippleColor,
}: ButtonProps) => {
  const [opacity] = useState(new Animated.Value(1));

  const baseClasses =
    "flex-row rounded-lg items-center justify-center overflow-hidden";

  const variantClasses: Record<string, string> = {
    primary: "bg-blue-600",
    secondary: "bg-green-600",
    outline: "border border-blue-600 bg-transparent",
  };

  const sizeClasses: Record<string, string> = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const textBase = "font-semibold";
  const textVariant: Record<string, string> = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-blue-600",
  };

  const iconColor = variant === "outline" ? "#007AFF" : "#fff";

  const handlePressIn = () => {
    if (Platform.OS === "ios") {
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  };

  const handlePressOut = () => {
    if (Platform.OS === "ios") {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  };

  const buttonClasses =
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ` +
    (disabled ? "bg-gray-400 border-gray-300 " : "") +
    className;

  const textClasses =
    `${textBase} ${textVariant[variant]} ` +
    (disabled ? "text-gray-200 " : "") +
    textClassName;

  return (
    <Pressable
      onPress={!disabled && !loading ? onPress : undefined}
      disabled={disabled}
      android_ripple={{
        color:
          rippleColor ||
          (variant === "outline"
            ? "rgba(0,122,255,0.15)"
            : "rgba(255,255,255,0.2)"),
        borderless: false,
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={buttonClasses}
    >
      <Animated.View style={{ opacity }} className="flex-row items-center">
        {loading ? (
          <ActivityIndicator
            color={variant === "outline" ? "#007AFF" : "#fff"}
            size="small"
          />
        ) : (
          <>
            {iconLeft && (
              <Ionicons
                name={iconLeft}
                size={iconSize}
                color={iconColor}
                style={{ marginRight: title ? 6 : 0 }}
              />
            )}
            {title && <Text className={textClasses}>{title}</Text>}
            {iconRight && (
              <Ionicons
                name={iconRight}
                size={iconSize}
                color={iconColor}
                style={{ marginLeft: title ? 6 : 0 }}
              />
            )}
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};
export default Button;
