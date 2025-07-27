import { View, Text } from "react-native";

const ChatScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Chat</Text>
      <Text className="text-xl mt-4 text-gray-600">
        Your messages and conversations.
      </Text>
    </View>
  );
};
export default ChatScreen;
