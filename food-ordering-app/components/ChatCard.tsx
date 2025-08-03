import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, Image } from "react-native";

export type ChatCardProps = {
  item: {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    read: boolean;
  };
  onPress?: () => void;
};

const ChatCard = ({ item, onPress }: ChatCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row justify-between items-center p-4 bg-white rounded-lg border border-gray-200 mb-2"
    >
      <View className="flex flex-row items-center gap-4">
        <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full" />
        <View className="gap-1">
          <Text className="text-sm font-medium">{item.name}</Text>
          <Text
            className={`text-xs ${
              item.read ? "text-gray-500" : "text-black font-semibold"
            }`}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
        </View>
      </View>

      <View className="items-end gap-1">
        <Text className="text-xs text-gray-400">{item.time}</Text>
        <Ionicons
          name="checkmark-done"
          size={18}
          color={item.read ? "#4f46e5" : "#9ca3af"}
        />
      </View>
    </Pressable>
  );
};

export default ChatCard;
