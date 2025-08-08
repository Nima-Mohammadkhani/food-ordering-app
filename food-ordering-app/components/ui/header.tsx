import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { HeaderProps } from "@/type";

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-2 pt-10 bg-white">
      <Pressable
        onPress={() => router.back()}
        className="p-2 rounded-full bg-gray-50"
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </Pressable>

      <Text className="text-lg font-semibold text-gray-800">{title}</Text>

      <Pressable className="p-2 rounded-full bg-gray-50">
        <Ionicons name="share-outline" size={24} color="#000" />
      </Pressable>
    </View>
  );
};

export default Header;
