import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "./ui/Button";
import { Product } from "@/type";
import { useTranslation } from "react-i18next";

const { width: screenWidth } = Dimensions.get("window");
const cardWidth = (screenWidth - 48) / 2;

const ProductCart = ({ item }: { item: Product }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handlePress = () => {
    router.push(`/product/${item.id}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      style={{
        width: cardWidth,
        minHeight: 220,
      }}
    >
      <View>
        <Image
          source={item.image}
          className="w-full rounded-t-xl"
          style={{
            height: cardWidth * 0.6,
          }}
          resizeMode="cover"
        />
      </View>

      <View className="p-3 flex-1 justify-around">
        <View className="flex gap-4">
          <Text
            className="font-semibold text-sm text-gray-800"
            numberOfLines={2}
            style={{ lineHeight: 18 }}
          >
            {t(`products.${item.id}.title`, { defaultValue: item.title })}
          </Text>

          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-1">
              <Ionicons name="star" color="orange" size={12} />
              <Text className="font-medium text-xs text-gray-600">
                {item.rating}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-1">
              <Ionicons name="location-outline" color="orange" size={12} />
              <Text className="font-medium text-xs text-gray-600">
                {item.distance}
                {t("product.distanceUnit")}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-2">
          <Text className="text-[#FE8C00] font-bold text-base">
            {t("product.pricePattern", { price: item.price.toFixed(2) })}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCart;
