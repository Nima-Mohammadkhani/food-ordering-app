import { View, Text } from "react-native";

const CartScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Cart</Text>
      <Text className="text-xl mt-4 text-gray-600">
        Your selected products will be displayed here.
      </Text>
    </View>
  );
};
export default CartScreen;
