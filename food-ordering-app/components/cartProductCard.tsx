import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  item: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: any;
    category: string;
    rating: number;
    distance: number;
    description: string;
  };
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
}) => {
  return (
    <View className="flex-row items-center border border-gray-200 bg-white rounded-lg p-4 mb-4 shadow-sm">
      <Image
        source={item.image}
        className="w-20 h-20 rounded-lg mr-3"
        resizeMode="cover"
      />

      <View className="flex-1">
        <Text className="font-bold text-base text-gray-900 mb-1">
          {item.title}
        </Text>
        <Text className="text-[#FE8C00] font-semibold text-base mb-2">
          ${item.price.toLocaleString()}
        </Text>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => decrementQuantity(item.id)}
            className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
          >
            <Ionicons name="remove" size={16} color="#666" />
          </TouchableOpacity>

          <Text className="mx-4 font-semibold text-gray-900">
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={() => incrementQuantity(item.id)}
            className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
          >
            <Ionicons name="add" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        className="ml-2"
      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
