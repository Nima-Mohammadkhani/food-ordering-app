import Button from "@/components/ui/Button";
import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import { useRouter } from "expo-router";
const CartScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <View className="flex-1 flex justify-center items-center gap-4">
        <Image
          source={require("@/assets/images/emptyCart.png")}
          resizeMode="cover"
          className="self-center mb-6"
          style={{ transform: [{ scale: 1.5 }] }}
        />
        <Text className="text-4xl font-bold mt-">Ouch! Hungry</Text>
        <Text className="text-base text-gray-500">
          Seems like you have not ordered any food yet
        </Text>
        <Button
          title="Find Foods"
          size="md"
          textClassName="text-white"
          className="bg-[#FE8C00] rounded-full"
          onPress={() => router.push("/")}
        />
      </View>
    </SafeAreaView>
  );
};
export default CartScreen;
