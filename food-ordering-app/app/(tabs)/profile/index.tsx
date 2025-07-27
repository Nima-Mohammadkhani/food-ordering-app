import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Profile</Text>
      <Text className="text-xl mt-4 text-gray-600">
        Your account information will be displayed here.
      </Text>
    </View>
  );
}
