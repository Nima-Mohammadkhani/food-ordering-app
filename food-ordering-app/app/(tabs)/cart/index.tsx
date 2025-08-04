import EmptyCartView from "@/components/emptyCartView";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/header";
import ProductCard from "@/components/cartProductCard";
import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Input from "@/components/ui/Input";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
  selected: boolean;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Burger With Meat",
      price: 12230,
      quantity: 1,
      image: require("@/assets/images/food/1.png"),
      selected: true,
    },
    {
      id: "2",
      name: "Ordinary Burgers",
      price: 12230,
      quantity: 2,
      image: require("@/assets/images/food/2.png"),
      selected: true,
    },
    {
      id: "3",
      name: "Ordinary Burgers",
      price: 12230,
      quantity: 2,
      image: require("@/assets/images/food/2.png"),
      selected: true,
    },
  ]);

  const handleIncrement = (id: string) => {
    setCartItems((prev: CartItem[]) =>
      prev.map((item: CartItem) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems((prev: CartItem[]) =>
      prev.map((item: CartItem) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setCartItems((prev: CartItem[]) =>
      prev.filter((item: CartItem) => item.id !== id)
    );
  };

  const totalItems = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );
  const totalAmount = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 0;
  const discount = 10900;
  const finalTotal = totalAmount + deliveryFee - discount;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar hidden />
      <Header title="My Cart" />
      {cartItems.length === 0 ? (
        <EmptyCartView />
      ) : (
        <ScrollView className="flex-1 py-2 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-500 text-sm">Delivery Location</Text>
            <Button
              title="Change Location"
              size="md"
              textClassName="text-white"
              className="bg-[#FE8C00] rounded-full"
            />
          </View>

          <View className="relative">
            <Input placeholder="Promo Code..." className="h-12" />
            <Button
              title="Apply"
              size="sm"
              textClassName="text-white"
              className="bg-[#FE8C00] rounded-full absolute right-1 top-1.5"
            />
          </View>

          {cartItems.map((item) => (
            <ProductCard
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onDelete={handleDelete}
            />
          ))}

          <View className="bg-white flex-1 flex gap-6 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
            <Text className="font-bold text-lg text-gray-900 mb-4">
              Payment Summary
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Total Items ({totalItems})</Text>
              <Text className="font-bold text-gray-900">
                ${totalAmount.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Delivery Fee</Text>
              <Text className="font-bold text-gray-900">Free</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Discount</Text>
              <Text className="font-bold text-[#FE8C00]">
                -${discount.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg text-gray-900">Total</Text>
              <Text className="font-bold text-xl text-gray-900">
                ${finalTotal.toLocaleString()}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
