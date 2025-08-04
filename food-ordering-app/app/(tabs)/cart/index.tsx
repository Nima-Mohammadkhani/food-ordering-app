import EmptyCartView from "@/components/emptyCartView";
import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
const CartScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <EmptyCartView/>
    </SafeAreaView>
  );
};
export default CartScreen;
