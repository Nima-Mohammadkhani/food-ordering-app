import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: any;
    selected: boolean;
  };
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  return (
    <View className="flex-row items-center border border-gray-200 bg-white rounded-lg p-4 mb-4 shadow-sm">
      <Image
        source={item.image}
        className="w-16 h-16 rounded-lg mr-3"
        resizeMode="cover"
      />

      <View className="flex-1">
        <Text className="font-bold text-base text-gray-900 mb-1">
          {item.name}
        </Text>
        <Text className="text-[#FE8C00] font-semibold text-base mb-2">
          ${item.price.toLocaleString()}
        </Text>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => onDecrement(item.id)}
            className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
          >
            <Ionicons name="remove" size={16} color="#666" />
          </TouchableOpacity>

          <Text className="mx-4 font-semibold text-gray-900">
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={() => onIncrement(item.id)}
            className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
          >
            <Ionicons name="add" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => onDelete(item.id)} className="ml-2">
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
