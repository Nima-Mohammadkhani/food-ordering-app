import { View, Text, Image, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./ui/Button";

interface ProductItem {
  id: number;
  image: any;
  name: string;
  category: string;
  map: number;
  like: number;
  price: number;
}

const ProductCart = ({item}: {item: ProductItem}) => {
  return (
    <View className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
      <View className="relative">
        <Image
          source={item.image}
          className="w-full h-32 rounded-md"
          resizeMode="cover"
        />
        <View className="flex justify-center items-center absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm">
          <Ionicons name="heart-outline" size={20} color="red" />
        </View>
      </View>
      <View className="flex gap-2 mt-2">
        <Text className="font-medium text-base" numberOfLines={1}>{item.name}</Text>
        <View className="flex flex-row justify-between items-center">
          <Text className="font-medium text-sm">
            <Ionicons name="star" color={"orange"} size={14} />
            {item.like}
          </Text>
          <Text className="font-medium text-sm">
            <Ionicons name="map-outline" color={"orange"} size={14} />
            {item.map}m
          </Text>
        </View>
        <Text className="text-[#FE8C00] font-bold text-lg">${item.price}</Text>
      </View>
    </View>
  );
};

export default ProductCart;
