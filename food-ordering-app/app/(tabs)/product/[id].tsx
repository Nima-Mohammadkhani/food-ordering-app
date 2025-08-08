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
import { addItemToCart } from "@/redux/slice/product";
import Toast from "react-native-toast-message";

const { width: screenWidth } = Dimensions.get("window");

interface Product {
  id: number;
  image: any;
  title: string;
  category: string;
  distance: number;
  rating: number;
  price: number;
}

const ProductDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();

  const product = productList.find((p) => p.id === parseInt(id as string));

  const recommendedProducts = productList.filter(
    (p) => p.id !== parseInt(id as string)
  );

  const groupedProducts = [];
  for (let i = 0; i < recommendedProducts.length; i += 2) {
    groupedProducts.push(recommendedProducts.slice(i, i + 2));
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-gray-600">Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    await dispatch(addItemToCart(product));
    Toast.show({ type: "success", text1: "Added to cart" });
  };

  const handleProductPress = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const renderRecommendedProduct = (item: Product) => (
    <Pressable
      key={item.id}
      onPress={() => handleProductPress(item.id)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      style={{ width: (screenWidth - 48) / 2 - 8 }}
    >
      <View className="relative">
        <Image
          source={item.image}
          className="w-full rounded-t-xl"
          style={{ height: 80 }}
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-full">
          <Ionicons name="heart-outline" size={12} color="red" />
        </View>
      </View>

      <View className="p-2">
        <Text className="font-semibold text-sm text-gray-800" numberOfLines={1}>
          {item.title}
        </Text>

        <View className="flex-row justify-between items-center mt-1">
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" color="orange" size={10} />
            <Text className="font-medium text-xs text-gray-600">
              {item.rating}
            </Text>
          </View>
          <Text className="text-[#FE8C00] font-bold text-sm">
            ${item.price.toFixed(2)}
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
      <Header title={product.title} />
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
            <Pressable
              onPress={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm"
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color="red"
              />
            </Pressable>
          </View>
        </View>

        <View className="px-4 mt-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {product.title} 🍔
          </Text>

          <Text className="text-2xl font-bold text-[#FE8C00] mb-4">
            $ {Number(product.price).toLocaleString()}
          </Text>

          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-lg">
              <Ionicons name="bicycle-outline" size={16} color="#FE8C00" />
              <Text className="text-[#FE8C00] font-medium ml-1 text-sm">
                Free Delivery
              </Text>
            </View>

            <View className="flex-row items-center bg-orange-50 px-3 py-2 rounded-lg">
              <Ionicons name="time-outline" size={16} color="#FE8C00" />
              <Text className="text-[#FE8C00] font-medium ml-1 text-sm">
                20 - 30
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
              Description
            </Text>
            <Text className="text-gray-600 leading-6">
              {product.title}
              {product.description}
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              Recommended For You
            </Text>
            <Pressable>
              <Text
                className="text-[#FE8C00] font-medium"
                onPress={() => router.replace("/(tabs)")}
              >
                See All
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
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center bg-gray-50 rounded-lg">
            <Pressable
              onPress={() => handleQuantityChange("decrease")}
              className="p-3"
            >
              <Ionicons name="remove" size={20} color="#666" />
            </Pressable>
            <Text className="text-lg font-semibold text-gray-800 px-4">
              {quantity}
            </Text>
            <Pressable
              onPress={() => handleQuantityChange("increase")}
              className="p-3"
            >
              <Ionicons name="add" size={20} color="#666" />
            </Pressable>
          </View>

          <View className="flex-1 ml-4">
            <Button
              title="Add to Cart"
              onPress={handleAddToCart}
              className="bg-[#FE8C00] rounded-2xl flex-1"
              textClassName="text-white font-semibold text-base"
              iconLeft="cart-outline"
              iconSize={20}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
