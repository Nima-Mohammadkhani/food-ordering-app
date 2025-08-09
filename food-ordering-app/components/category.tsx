import { View, Image, Text, TouchableOpacity } from "react-native";
import { CategoryProps } from "@/type";
import { useTranslation } from "react-i18next";

const Category = ({
  onCategoryPress,
  onSeeAllPress,
  selectedCategory = "all",
}: CategoryProps) => {
  const { t } = useTranslation();

  type CategoryKey = "burger" | "sandwich" | "dessert" | "pizza";
  const category: { id: number; key: CategoryKey; label: string; image: any }[] = [
    {
      id: 1,
      key: "burger",
      label: t("home.categories.burger"),
      image: require("../assets/images/category/burger.png"),
    },
    {
      id: 2,
      key: "sandwich",
      label: t("home.categories.sandwich"),
      image: require("../assets/images/category/toast.png"),
    },
    {
      id: 3,
      key: "dessert",
      label: t("home.categories.dessert"),
      image: require("../assets/images/category/drink.png"),
    },
    {
      id: 4,
      key: "pizza",
      label: t("home.categories.pizza"),
      image: require("../assets/images/category/pizza.png"),
    },
  ];

  return (
    <View className="flex justify-between items-center gap-4">
      <View className="flex-row justify-between items-center w-full px-6 py-2">
        <Text className="font-semibold text-xl">{t("home.findByCategory")}</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text className="text-[#FE8C00] font-medium">{t("home.seeAll")}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between w-full px-6">
        {category.map((item) => (
          <TouchableOpacity
            key={item.id}
          className={`flex items-center gap-2 p-2 rounded-lg ${
              selectedCategory !== "all" && selectedCategory === item.key
                ? "bg-[#FE8C00]/10"
                : ""
            }`}
            onPress={() => onCategoryPress?.(item.key)}
          >
            <Image source={item.image} className="size-10" />
            <Text
              className={`text-xs capitalize ${
                selectedCategory !== "all" && selectedCategory === item.key
                  ? "text-[#FE8C00] font-medium"
                  : "text-gray-500"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Category;
