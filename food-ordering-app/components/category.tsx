import { View, Image, ImageSourcePropType, Text, TouchableOpacity } from "react-native";

interface CategoryProps {
  onCategoryPress?: (category: string) => void;
  onSeeAllPress?: () => void;
  selectedCategory?: string;
}

const Category = ({ onCategoryPress, onSeeAllPress, selectedCategory = "all" }: CategoryProps) => {
  const category: { id: number; name: string; image: ImageSourcePropType }[] = [
    {
      id: 1,
      name: "burger",
      image: require("../assets/images/category/burger.png"),
    },
    {
      id: 2,
      name: "toast",
      image: require("../assets/images/category/toast.png"),
    },
    {
      id: 3,
      name: "drink",
      image: require("../assets/images/category/drink.png"),
    },
    {
      id: 4,
      name: "pizza",
      image: require("../assets/images/category/pizza.png"),
    },
  ];

  return (
    <View className="flex justify-between items-center gap-4">
      <View className="flex-row justify-between items-center w-full px-6 py-2">
        <Text className="font-semibold text-xl">Find by Category</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text className="text-[#FE8C00] font-medium">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between w-full px-6">
        {category.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            className={`flex items-center gap-2 p-2 rounded-lg ${
              selectedCategory === item.name && selectedCategory !== "all" ? 'bg-[#FE8C00]/10' : ''
            }`}
            onPress={() => onCategoryPress?.(item.name)}
          >
            <Image source={item.image} className="size-10" />
            <Text className={`text-xs capitalize ${
              selectedCategory === item.name && selectedCategory !== "all" ? 'text-[#FE8C00] font-medium' : 'text-gray-500'
            }`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Category;
