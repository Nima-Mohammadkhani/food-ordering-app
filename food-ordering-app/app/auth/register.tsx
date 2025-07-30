import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string | undefined>();
  const [checked, setChecked] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />
      <View className="flex-1 flex flex-col gap-8 px-6 justify-center">
        <View className="mb-6">
          <Text className="text-4xl font-bold text-black">Create your new</Text>
          <Text className="text-4xl font-bold text-black mb-2">account.</Text>
          <Text className="text-base text-gray-500">
            Create an account to start looking for the food you like
          </Text>
        </View>

        <View className="gap-4">
          <Input label="Email Address" value={email} onChangeText={setEmail} />
          <Input
            label="User Name"
            value={userName}
            onChangeText={setUserName}
          />
          <Input
            label="Password"
            secureToggle
            secureTextEntry
            value={password}
            onChangeText={setUserName}
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
              I Agree with{" "}
              <Text className="text-[#FE8C00]">Terms of Service</Text> and{" "}
              <Text className="text-[#FE8C00]">Privacy Policy</Text>
            </Text>
          </View>
            <Button title="Sign In" size="md" textClassName="text-white" className="bg-[#FE8C00] rounded-full mt-2" />
        </View>

        <View className="flex-row items-center">
          <View className="flex-1 h-px bg-neutral-300" />
          <Text className="mx-4 text-neutral-500 text-sm">Or sign in with</Text>
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
