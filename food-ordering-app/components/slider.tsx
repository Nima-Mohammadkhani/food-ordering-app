import { View, Image, Text, Pressable } from "react-native";
import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Product } from "@/type";

const Slider = ({ favoriteProducts }: { favoriteProducts: Product[] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <View className="relative min-h-80">
      <Image
        source={require("../assets/images/food/slider.png")}
        className="h-80"
        resizeMode="cover"
      />
      <View className="flex justify-between absolute top-0 py-16 px-6 min-h-80 w-full">
        <View className="flex flex-row justify-between items-center">
          <View className="gap-4">
            <Button
              iconRight="chevron-down"
              textClassName="text-white"
              title={t("home.yourLocation")}
            />
            <Button
              iconLeft="location-outline"
              textClassName="text-white"
              title={t("home.city")}
              className="justify-between"
            />
          </View>
          <View className="flex flex-row gap-4">
            <Pressable
              onPress={() => router.push("/favorite")}
              className="flex justify-center items-center relative rounded-full size-10 border-white border-2"
            >
              <Ionicons name="heart-outline" size={20} color={"white"} />
              {favoriteProducts.length > 0 && (
                <View className="absolute -right-1 -top-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">
                    {favoriteProducts.length}
                  </Text>
                </View>
              )}
            </Pressable>
            <View className="flex justify-center items-center rounded-full size-10 border-white border-2">
              <Ionicons
                name="notifications-outline"
                size={20}
                color={"white"}
              />
            </View>
          </View>
        </View>
        <View className="flex gap-2">
          <Text className="text-4xl font-bold text-white">
            {t("home.headline1")}
          </Text>
          <Text className="text-4xl font-bold text-white">
            {t("home.headline2")}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Slider;
