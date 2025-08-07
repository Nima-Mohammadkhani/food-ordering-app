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
import { useSelector } from "react-redux";
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
  const productList = useSelector((state) => state.product.productList);
  
  const filteredProducts =
    selectedCategory === "all"
      ? productList
      : productList.filter((product) => product.category === selectedCategory);
  
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
