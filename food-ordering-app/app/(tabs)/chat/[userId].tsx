import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/ui/header";

interface IMessage {
  id: string;
  message: string;
  timestamp: number;
  isUser: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
}

const initialMessages: IMessage[] = [
  {
    id: "1",
    message: "Hi! How are you?",
    timestamp: Date.now() - 60000,
    isUser: true,
    status: "read",
  },
  {
    id: "2",
    message: "I'm good, thanks! How about you?",
    timestamp: Date.now() - 55000,
    isUser: false,
  },
  {
    id: "3",
    message: "I'm doing great, thanks!",
    timestamp: Date.now() - 50000,
    isUser: true,
    status: "delivered",
  },
  {
    id: "4",
    message: "What's new with you?",
    timestamp: Date.now() - 40000,
    isUser: false,
  },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: IMessage = {
      id: (messages.length + 1).toString(),
      message: message.trim(),
      timestamp: Date.now(),
      isUser: true,
      status: "sending",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setIsTyping(false);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 2000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 3000);
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }: { item: IMessage }) => {
    return (
      <View
        className={`my-1 flex-row ${
          item.isUser ? "justify-end" : "justify-start"
        }`}
      >
        <View
          className={`max-w-4/5 p-3 rounded-2xl ${
            item.isUser
              ? "bg-[#FE8C00] rounded-br-md"
              : "bg-white border border-gray-300 rounded-bl-md"
          }`}
        >
          <Text
            className={`text-sm leading-relaxed ${
              item.isUser ? "text-white" : "text-black"
            }`}
          >
            {item.message}
          </Text>
          <View className="flex-row justify-between mt-2 items-center gap-2">
            <Text
              className={`text-xs ${
                item.isUser ? "text-white/70" : "text-gray-500"
              }`}
            >
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            {item.isUser && (
              <View className="flex-row ml-2">
                {item.status === "sending" && (
                  <Ionicons
                    name="refresh"
                    size={14}
                    color="white"
                    className="animate-spin"
                  />
                )}
                {item.status === "sent" && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
                {item.status === "delivered" && (
                  <View className="flex-row -space-x-1">
                    <Ionicons name="checkmark" size={14} color="white" />
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                )}
                {item.status === "read" && (
                  <View className="flex-row -space-x-1">
                    <Ionicons name="checkmark" size={14} color="#FE8C00" />
                    <Ionicons name="checkmark" size={14} color="#FE8C00" />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
    <Header title="Chat" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />

        {isTyping && (
          <View className="px-4 py-2">
            <Text className="text-gray-400">Typing...</Text>
          </View>
        )}

        <View className="flex-row items-center px-4 py-3 border-t border-gray-300 bg-white">
          <TextInput
            className="flex-1 bg-white border border-gray-300 text-black rounded-2xl px-4 py-3 text-base"
            placeholder="Write your message..."
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={message}
            onChangeText={(text) => {
              setMessage(text);
              setIsTyping(text.length > 0);
            }}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!message.trim()}
            className={`ml-3 rounded-full p-3 ${
              message.trim()
                ? "bg-[#FE8C00] shadow-lg"
                : "bg-gray-300 opacity-50"
            }`}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
