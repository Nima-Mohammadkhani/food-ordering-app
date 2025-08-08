import EmptyCartView from "@/components/emptyCartView";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/header";
import ProductCard from "@/components/cartProductCard";
import React, { useMemo, useState } from "react";
import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Input from "@/components/ui/Input";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/slice/product";
import { createOrderFromCart } from "@/redux/slice/product";
import Toast from "react-native-toast-message";
import { RootState } from "@/type";

const CartScreen = () => {
  const productCartList = useSelector((state: RootState) => state.product.productCartList);
  const dispatch = useDispatch();
  const router = useRouter();
  const [promo, setPromo] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);

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

  const unpaidItems = useMemo(
    () => productCartList.filter((it) => it.status !== 'delivering'),
    [productCartList]
  );
  const subtotal = unpaidItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = unpaidItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const discountAmount = useMemo(
    () => +(subtotal * (discountPercent / 100)).toFixed(2),
    [subtotal, discountPercent]
  );
  const totalPrice = useMemo(
    () => +(subtotal - discountAmount).toFixed(2),
    [subtotal, discountAmount]
  );

  const applyPromo = () => {
    if (!promo.trim()) return;
    if (promo.trim().toLowerCase() === "food") {
      setDiscountPercent(25);
      Toast.show({ type: "success", text1: "Promo applied (25%)" });
    } else {
      setDiscountPercent(0);
      Toast.show({ type: "error", text1: "Invalid promo code" });
    }
  };

  const handlePay = () => {
    if (unpaidItems.length === 0) return;
    dispatch(createOrderFromCart({ discountPercent }));
    Toast.show({ type: "success", text1: "Payment successful" });
    router.push("/(tabs)/cart/map");
  };

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
            <Input
              placeholder="Promo Code..."
              value={promo}
              onChangeText={setPromo}
              className="h-12"
            />
            <Button
              title="Apply"
              size="sm"
              textClassName="text-white"
              className="bg-[#FE8C00] rounded-full absolute right-1 top-1.5"
              onPress={applyPromo}
            />
          </View>

          {productCartList.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              incrementQuantity={handleIncrementQuantity}
              decrementQuantity={handleDecrementQuantity}
              onTrack={() => router.push("/(tabs)/cart/map")}
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
              <Text className="font-bold text-gray-900">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Delivery Fee</Text>
              <Text className="font-bold text-gray-900">Free</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Discount</Text>
              <Text className="font-bold text-[#FE8C00]">-${discountAmount.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg text-gray-900">Total</Text>
              <Text className="font-bold text-xl text-gray-900">${totalPrice.toFixed(2)}</Text>
            </View>
            <Button
              title="Pay"
              size="md"
              textClassName="text-white"
              className="bg-[#FE8C00] rounded-full"
              onPress={handlePay}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
