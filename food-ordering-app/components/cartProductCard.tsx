import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartItem } from "@/type";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  item: CartItem;
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  onTrack?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  onTrack,
}) => {
  const { t } = useTranslation();
  return (
    <View className="flex-row items-center border border-gray-200 bg-white rounded-lg p-4 mb-4 shadow-sm">
      <Image
        source={item.image}
        className="w-20 h-20 rounded-lg mr-3"
        resizeMode="cover"
      />

      <View className="flex-1">
        <Text className="font-bold text-base text-gray-900 mb-1">
          {t(`products.${item.id}.title`, { defaultValue: item.title })}
        </Text>
        <Text className="text-[#FE8C00] font-semibold text-base mb-2">
          ${item.price.toLocaleString()}
        </Text>

        {item.status === "delivering" ? (
          <View className="flex-row items-center gap-2">
            <Ionicons name="bicycle" size={16} color="#FE8C00" />
            <Text className="text-sm text-[#FE8C00] font-medium">
              {t("cart.sending")}
            </Text>
            <TouchableOpacity
              onPress={() => onTrack && onTrack(item.id)}
              className="ml-3 px-3 py-1 rounded-full bg-[#FE8C00]"
            >
              <Text className="text-white text-xs">{t("cart.viewStatus")}</Text>
            </TouchableOpacity>
          </View>
        ) : (
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
        )}
      </View>

      {item.status !== "delivering" && (
        <TouchableOpacity
          onPress={() => removeFromCart(item.id)}
          className="ml-2"
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductCard;
