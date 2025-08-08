import EmptyCartView from "@/components/emptyCartView";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/header";
import ProductCard from "@/components/cartProductCard";
import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Input from "@/components/ui/Input";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/slice/product";
import Toast from "react-native-toast-message";
import { RootState } from "@/type";

const CartScreen = () => {
  const productCartList = useSelector((state: RootState) => state.product.productCartList);
  const dispatch = useDispatch();
  const router = useRouter();

  const removeFromCart = async (productId: number) => {
    await dispatch(removeItemFromCart(productId));
    Toast.show({ type: "success", text1: "Removed from cart" });
  };

  const handleIncrementQuantity = async (productId: number) => {
    await dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = async (productId: number) => {
    await dispatch(decrementQuantity(productId));
  };

  const totalPrice = productCartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = productCartList.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar hidden />
      <Header title="My Cart" />
      {productCartList.length === 0 ? (
        <EmptyCartView />
      ) : (
        <ScrollView
          className="flex-1 py-2 px-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="relative">
            <Input placeholder="Promo Code..." className="h-12" />
            <Button
              title="Apply"
              size="sm"
              textClassName="text-white"
              className="bg-[#FE8C00] rounded-full absolute right-1 top-1.5"
            />
          </View>

          {productCartList.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              incrementQuantity={handleIncrementQuantity}
              decrementQuantity={handleDecrementQuantity}
            />
          ))}

          <View className="bg-white flex-1 flex gap-6 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
            <Text className="font-bold text-lg text-gray-900 mb-4">
              Payment Summary
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Total Items</Text>
              <Text className="font-bold text-gray-900">
                {totalItems} items
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="font-bold text-gray-900">
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Delivery Fee</Text>
              <Text className="font-bold text-gray-900">Free</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Discount</Text>
              <Text className="font-bold text-[#FE8C00]">$0.00</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg text-gray-900">Total</Text>
              <Text className="font-bold text-xl text-gray-900">
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
            <Button
              title="Pay"
              size="md"
              textClassName="text-white"
              className="bg-[#FE8C00] rounded-full"
              onPress={() => router.push("/(tabs)/cart/map")}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
