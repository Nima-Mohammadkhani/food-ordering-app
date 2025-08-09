import { View, Image, Text, TouchableOpacity } from "react-native";
import { CategoryItem, CategoryProps } from "@/type";
import { useTranslation } from "react-i18next";

const Category = ({
  onCategoryPress,
  onSeeAllPress,
  selectedCategory = "all",
}: CategoryProps) => {
  const { t } = useTranslation();

  const category: CategoryItem[] = [
    {
      id: 1,
      name: t("home.categories.burger"),
      image: require("../assets/images/category/burger.png"),
    },
    {
      id: 2,
      name: t("home.categories.sandwich"),
      image: require("../assets/images/category/toast.png"),
    },
    {
      id: 3,
      name: t("home.categories.dessert"),
      image: require("../assets/images/category/drink.png"),
    },
    {
      id: 4,
      name: t("home.categories.pizza"),
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
              selectedCategory === item.name && selectedCategory !== "all"
                ? "bg-[#FE8C00]/10"
                : ""
            }`}
            onPress={() => onCategoryPress?.(item.name)}
          >
            <Image source={item.image} className="size-10" />
            <Text
              className={`text-xs capitalize ${
                selectedCategory === item.name && selectedCategory !== "all"
                  ? "text-[#FE8C00] font-medium"
                  : "text-gray-500"
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Category;
