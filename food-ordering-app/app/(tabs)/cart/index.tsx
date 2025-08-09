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
import { useTranslation } from "react-i18next";
import formatCurrency from "@/utils/currency";

const CartScreen = () => {
  const productCartList = useSelector(
    (state: RootState) => state.product.productCartList
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [promo, setPromo] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const { t, i18n } = useTranslation();

  const removeFromCart = async (productId: number) => {
    await dispatch(removeItemFromCart(productId));
    Toast.show({ type: "success", text1: t("cart.removedFromCart") });
  };

  const handleIncrementQuantity = async (productId: number) => {
    await dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = async (productId: number) => {
    await dispatch(decrementQuantity(productId));
  };

  const unpaidItems = useMemo(
    () => productCartList.filter((it) => it.status !== "delivering"),
    [productCartList]
  );
  const subtotal = unpaidItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = unpaidItems.reduce((acc, item) => acc + item.quantity, 0);

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
      Toast.show({
        type: "success",
        text1: t("cart.promoApplied", { percent: 25 }),
      });
    } else {
      setDiscountPercent(0);
      Toast.show({ type: "error", text1: t("cart.invalidPromo") });
    }
  };

  const handlePay = () => {
    if (unpaidItems.length === 0) return;
    dispatch(createOrderFromCart({ discountPercent }));
    Toast.show({ type: "success", text1: t("cart.paymentSuccess") });
    router.push("/(tabs)/cart/map");
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <Header title={t("cart.myCart")} />
      {productCartList.length === 0 ? (
        <EmptyCartView />
      ) : (
        <ScrollView
          className="flex-1 py-2 px-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="relative">
            <Input
              placeholder={t("cart.promoPlaceholder")}
              value={promo}
              onChangeText={setPromo}
              className="h-12"
            />
            <Button
              title={t("cart.apply")}
              size="sm"
              textClassName="text-white"
              className={`${
                i18n.language == "fa" ? "top-1" : "top-1.5"
              } bg-[#FE8C00] rounded-full absolute right-1`}
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
              {t("cart.paymentSummary")}
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">{t("cart.totalItems")}</Text>
              <Text className="font-bold text-gray-900">
                {t("cart.itemsCount", { count: totalItems })}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">{t("cart.subtotal")}</Text>
              <Text className="font-bold text-gray-900">
                {formatCurrency(Number(subtotal.toFixed(2)), i18n.language)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">{t("cart.deliveryFee")}</Text>
              <Text className="font-bold text-gray-900">{t("cart.free")}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">{t("cart.discount")}</Text>
              <Text className="font-bold text-[#FE8C00]">
                {formatCurrency(
                  Number((-discountAmount).toFixed(2)),
                  i18n.language
                )}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg text-gray-900">
                {t("cart.total")}
              </Text>
              <Text className="font-bold text-xl text-gray-900">
                {formatCurrency(Number(totalPrice.toFixed(2)), i18n.language)}
              </Text>
            </View>
            <Button
              title={t("cart.pay")}
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
