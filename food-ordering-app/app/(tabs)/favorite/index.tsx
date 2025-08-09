import React from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Header from "@/components/ui/header";
import ProductCard from "@/components/productCard";
import { RootState, Product } from "@/type";
import { useTranslation } from "react-i18next";
import EmptyCartView from "@/components/emptyCartView";

const FavoriteScreen = () => {
  const favoriteProducts = useSelector(
    (state: RootState) => state.product.favoriteProducts
  );
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard item={item} />
  );

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <Header title={t("favorite.title")} />
      {favoriteProducts.length === 0 ? (
        <EmptyCartView />
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 16,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 16,
            gap: 16,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoriteScreen;
