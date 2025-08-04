import EmptyCartScreen from "@/components/EmptyCartScreen";
import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
const CartScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <EmptyCartScreen />
    </SafeAreaView>
  );
};
export default CartScreen;
