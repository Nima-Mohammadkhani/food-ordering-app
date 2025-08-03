import { View, SafeAreaView, FlatList, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/ui/header";
import ChatCard from "@/components/ChatCard";

interface IChat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  read: boolean;
  avatar: string;
}

const chats: IChat[] = [
  {
    id: "1",
    name: "Ali Reza",
    lastMessage: "Hey! How are you?",
    time: "10:30 AM",
    read: true,
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    name: "Sara M",
    lastMessage: "See you tomorrow.",
    time: "09:15 AM",
    read: false,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    name: "Mohammad",
    lastMessage: "Thanks!",
    time: "Yesterday",
    read: true,
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: "4",
    name: "Niloofar",
    lastMessage: "Typing...",
    time: "2 days ago",
    read: false,
    avatar: "https://i.pravatar.cc/100?img=4",
  },
];

const HomeScreen = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: IChat }) => (
    <ChatCard
      id={item.id}
      name={item.name}
      avatar={item.avatar}
      lastMessage={item.lastMessage}
      time={item.time}
      read={item.read}
      onPress={() => router.push(`/chat/${item.id}`)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar hidden />
      <Header title="Chat List" />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
