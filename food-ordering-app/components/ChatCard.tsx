import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, Image } from "react-native";

export type ChatCardProps = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  read: boolean;
  onPress: () => void;
};

const ChatCard = ({
  name,
  avatar,
  lastMessage,
  time,
  read,
  onPress,
}: ChatCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row justify-between items-center p-4 bg-white rounded-lg border border-gray-200 mb-2"
    >
      <View className="flex flex-row items-center gap-4">
        <Image source={{ uri: avatar }} className="w-12 h-12 rounded-full" />
        <View className="gap-1">
          <Text className="text-sm font-medium">{name}</Text>
          <Text
            className={`text-xs ${
              read ? "text-gray-500" : "text-black font-semibold"
            }`}
            numberOfLines={1}
          >
            {lastMessage}
          </Text>
        </View>
      </View>
      <View className="items-end gap-1">
        <Text className="text-xs text-gray-400">{time}</Text>
        <Ionicons
          name="checkmark-done"
          size={18}
          color={read ? "#4f46e5" : "#9ca3af"}
        />
      </View>
    </Pressable>
  );
};

export default ChatCard;
