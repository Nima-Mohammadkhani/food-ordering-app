import { View, Text, Image, ImageSourcePropType, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 48) / 2;

const ProductCart = ({item}: {item: ProductItem}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${item.id}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      style={{
        width: cardWidth,
        minHeight: 220,
      }}
    >
      <View className="relative">
        <Image
          source={item.image}
          className="w-full rounded-t-xl"
          style={{
            height: cardWidth * 0.6,
          }}
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
          <Ionicons name="heart-outline" size={16} color="red" />
        </View>
      </View>
      
      <View className="p-3 flex-1 justify-around">
        <View className="flex gap-4">
          <Text 
            className="font-semibold text-sm text-gray-800" 
            numberOfLines={2}
            style={{ lineHeight: 18 }}
          >
            {item.name}
          </Text>
          
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-1">
              <Ionicons name="star" color="orange" size={12} />
              <Text className="font-medium text-xs text-gray-600">
                {item.like}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-1">
              <Ionicons name="location-outline" color="orange" size={12} />
              <Text className="font-medium text-xs text-gray-600">
                {item.map}m
              </Text>
            </View>
          </View>
        </View>
        
        <View className="mt-2">
          <Text className="text-[#FE8C00] font-bold text-base">
            ${item.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCart;
