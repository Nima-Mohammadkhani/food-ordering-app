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
import { Product, RootState } from "@/type";

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const productList = useSelector(
    (state: RootState) => state.product.productList
  );
  const favoriteProducts = useSelector(
    (state: RootState) => state.product.favoriteProducts
  );
  const filteredProducts =
    selectedCategory === "all"
      ? productList
      : productList.filter(
          (product) => product.category?.toLowerCase() === selectedCategory
        );

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
        <Slider favoriteProducts={favoriteProducts} />
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
