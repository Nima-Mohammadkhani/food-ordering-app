import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/header";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  addToFavorites,
  removeFromFavorites,
} from "@/redux/slice/product";
import Toast from "react-native-toast-message";
import { Product, RootState } from "@/type";
import { useTranslation } from "react-i18next";
import formatCurrency from "@/utils/currency";

const { width: screenWidth } = Dimensions.get("window");

const ProductDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const productList = useSelector(
    (state: RootState) => state.product.productList
  );
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const product = productList.find(
    (p: Product) => p.id === parseInt(id as string)
  );

  const recommendedProducts = productList.filter(
    (p: Product) => p.id !== parseInt(id as string)
  );

  const groupedProducts = [];
  for (let i = 0; i < recommendedProducts.length; i += 2) {
    groupedProducts.push(recommendedProducts.slice(i, i + 2));
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-gray-600">{t("product.notFound")}</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = async () => {
    await dispatch(addItemToCart(product));
    Toast.show({ type: "success", text1: t("product.addedToCartSuccess") });
  };

  const handleProductPress = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const isInFavorites = useSelector((state: RootState) =>
    state.product.favoriteProducts.some((p) => p.id === product.id)
  );

  const handleToggleFavorite = async () => {
    if (isInFavorites) {
      await dispatch(removeFromFavorites(product.id));
      Toast.show({ type: "success", text1: t("favorite.removed") });
    } else {
      await dispatch(addToFavorites(product));
      Toast.show({ type: "success", text1: t("favorite.added") });
    }
  };

  const renderRecommendedProduct = (item: Product) => (
    <Pressable
      key={item.id}
      onPress={() => handleProductPress(item.id)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      style={{ width: (screenWidth - 48) / 2 - 8 }}
    >
      <View>
        <Image
          source={item.image}
          className="w-full rounded-t-xl"
          style={{ height: 80 }}
          resizeMode="cover"
        />
      </View>

      <View className="p-2">
        <Text className="font-semibold text-sm text-gray-800" numberOfLines={1}>
          {t(`products.${item.id}.title`, { defaultValue: item.title })}
        </Text>

        <View className="flex-row justify-between items-center mt-1">
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" color="orange" size={10} />
            <Text className="font-medium text-xs text-gray-600">
              {item.rating}
            </Text>
          </View>
          <Text className="text-[#FE8C00] font-bold text-sm">
            {formatCurrency(Number(item.price.toFixed(2)), i18n.language)}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const renderProductGroup = ({ item }: { item: Product[] }) => (
    <View style={{ width: screenWidth }} className="px-4">
      <View className="flex-row justify-between gap-4">
        {item.map((product) => renderRecommendedProduct(product))}
        {item.length === 1 && (
          <View style={{ width: (screenWidth - 48) / 2 - 8 }} />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <Header
        title={t(`products.${product.id}.title`, {
          defaultValue: product.title,
        })}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 mt-4">
          <View className="relative rounded-2xl overflow-hidden">
            <Image
              source={product.image}
              style={{
                width: screenWidth - 28,
                height: (screenWidth - 28) * 0.7,
              }}
              resizeMode="cover"
            />
            <Pressable className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm">
              <Ionicons
                name={isInFavorites ? "heart" : "heart-outline"}
                size={24}
                color="red"
                onPress={handleToggleFavorite}
              />
            </Pressable>
          </View>
        </View>

        <View className="px-4 mt-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {t(`products.${product.id}.title`, { defaultValue: product.title })}{" "}
            🍔
          </Text>

          <Text className="text-2xl font-bold text-[#FE8C00] mb-4">
            {formatCurrency(Number(product.price), i18n.language)}
          </Text>

          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-lg">
              <Ionicons name="bicycle-outline" size={16} color="#FE8C00" />
              <Text className="text-[#FE8C00] font-medium ml-1 text-sm">
                {t("product.freeDelivery")}
              </Text>
            </View>

            <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-lg">
              <Ionicons name="time-outline" size={16} color="#FE8C00" />
              <Text className="text-[#FE8C00] font-medium ml-1 text-sm">
                20 - 30 {t("product.minutesUnit")}
              </Text>
            </View>

            <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-lg">
              <Ionicons name="star" size={16} color="#FE8C00" />
              <Text className="text-[#FE8C00] font-medium ml-1 text-sm">
                {product.rating}
              </Text>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              {t("product.descriptionTitle")}
            </Text>
            <Text className="text-gray-600 leading-6">
              {t(`products.${product.id}.description`, {
                defaultValue: product.description || "",
              })}
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              {t("product.recommendedTitle")}
            </Text>
            <Pressable>
              <Text
                className="text-[#FE8C00] font-medium"
                onPress={() => router.replace("/(tabs)")}
              >
                {t("home.seeAll")}
              </Text>
            </Pressable>
          </View>
        </View>

        {groupedProducts.length > 0 && (
          <View className="mb-4">
            <FlatList
              ref={flatListRef}
              data={groupedProducts}
              renderItem={renderProductGroup}
              keyExtractor={(item, index) => `group-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / screenWidth
                );
                setCurrentIndex(index);
              }}
              getItemLayout={(data, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index,
              })}
            />
          </View>
        )}
      </ScrollView>

      <View className="bg-white border-t border-gray-100 px-4 py-4">
        <Button
          title={t("product.addToCart")}
          onPress={handleAddToCart}
          className="bg-[#FE8C00] rounded-2xl"
          textClassName="text-white font-semibold text-base"
          iconLeft="cart-outline"
          size="md"
          iconSize={20}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
