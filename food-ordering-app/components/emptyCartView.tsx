import { Text, Image, View } from "react-native";
import Button from "./ui/Button";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
const EmptyCartView = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <View className="flex-1 flex justify-center items-center gap-4">
      <Image
        source={require("@/assets/images/emptyCart.png")}
        resizeMode="cover"
        className="self-center mb-6"
        style={{ transform: [{ scale: 1.5 }] }}
      />
      <Text className="text-4xl font-bold mt-">{t("cart.emptyTitle")}</Text>
      <Text className="text-base text-gray-500">{t("cart.emptySubtitle")}</Text>
      <Button
        title={t("cart.findFoods")}
        size="md"
        textClassName="text-white"
        className="bg-[#FE8C00] rounded-full"
        onPress={() => router.push("/")}
      />
    </View>
  );
};
export default EmptyCartView;
