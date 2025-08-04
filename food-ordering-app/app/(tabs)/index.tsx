import Category from "@/components/category";
import ProductCart from "@/components/productCard";
import Slider from "@/components/slider";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  FlatList,
} from "react-native";
import { useState } from "react";

interface Product {
  id: number;
  image: any;
  name: string;
  category: string;
  map: number;
  like: number;
  price: number;
}

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allProducts: Product[] = [
    {
      id: 1,
      image: require("../../assets/images/food/1.png"),
      name: "Ordinary Burgers",
      category: "burger",
      map: 190,
      like: 4.9,
      price: 17.29,
    },
    {
      id: 2,
      image: require("../../assets/images/food/2.png"),
      name: "Cheese Pizza",
      category: "pizza",
      map: 150,
      like: 4.7,
      price: 22.5,
    },
    {
      id: 3,
      image: require("../../assets/images/food/3.png"),
      name: "Fresh Juice",
      category: "drink",
      map: 80,
      like: 4.8,
      price: 8.99,
    },
    {
      id: 4,
      image: require("../../assets/images/food/4.png"),
      name: "Grilled Toast",
      category: "toast",
      map: 120,
      like: 4.6,
      price: 12.99,
    },
    {
      id: 5,
      image: require("../../assets/images/food/2.png"),
      name: "Double Burger",
      category: "burger",
      map: 200,
      like: 4.9,
      price: 19.99,
    },
    {
      id: 6,
      image: require("../../assets/images/food/1.png"),
      name: "Margherita Pizza",
      category: "pizza",
      map: 180,
      like: 4.8,
      price: 24.99,
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSeeAllPress = () => {
    setSelectedCategory("all");
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => {
    return <ProductCart item={item} />;
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Slider />
        <Category
          onCategoryPress={handleCategoryPress}
          selectedCategory={selectedCategory}
          onSeeAllPress={handleSeeAllPress}
        />
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 16,
            gap: 16,
          }}
          contentContainerStyle={{
            paddingTop: 16,
            gap: 16,
          }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
