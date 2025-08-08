import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
const TabsLayout = () => {
  const productCartList = useSelector((state) => state.product.productCartList);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff6600",
        tabBarInactiveTintColor: "#777",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: "cart",
          tabBarIcon: ({ color, size }) => (
            <View className="relative">
              <Ionicons name="cart-outline" size={size} color={color} />
              {productCartList.length > 0 && (
                <View className="absolute -right-1 -top-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">
                    {productCartList.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat/index"
        options={{
          title: "chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="chat/[userId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="cart/map"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
