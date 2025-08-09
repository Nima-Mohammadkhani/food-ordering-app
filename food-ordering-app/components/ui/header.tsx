import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { HeaderProps } from "@/type";
import { useTranslation } from "react-i18next";

const Header: React.FC<HeaderProps> = ({
  title,
  rightIconName = "share-outline",
  onRightPress,
  hideLeft,
}) => {
  const router = useRouter();
  const {i18n} = useTranslation()
  return (
    <View className="flex-row items-center justify-between px-4 py-2 pt-10 bg-white">
      {hideLeft ? (
        <View className="p-2 rounded-full" />
      ) : (
        <Pressable
          onPress={() => router.back()}
          className="p-2 rounded-full bg-gray-50"
        >
          <Ionicons name={i18n.language == "fa"? "chevron-forward" :"chevron-back"} size={24} color="#000" />
        </Pressable>
      )}

      <Text className="text-lg font-semibold text-gray-800">{title}</Text>

      <Pressable className="p-2 rounded-full bg-gray-50" onPress={onRightPress}>
        <Ionicons name={rightIconName} size={24} color="#000" />
      </Pressable>
    </View>
  );
};

export default Header;
