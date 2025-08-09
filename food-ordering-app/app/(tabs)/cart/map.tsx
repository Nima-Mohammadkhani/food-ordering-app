import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LatLng, RootState } from "@/type";
import { useTranslation } from "react-i18next";
import formatCurrency from "@/utils/currency";
import { useSelector } from "react-redux";

const LiveDeliveryMap = () => {
  const [driverLocation, setDriverLocation] = useState<LatLng | null>(null);
  const [locationLoaded, setLocationLoaded] = useState<boolean>(false);
  const mapRef = useRef<MapView | null>(null);
  const { t, i18n } = useTranslation();

  const restaurantLocation: LatLng = {
    latitude: 35.6892,
    longitude: 51.389,
  };

  const userLocation: LatLng = {
    latitude: 35.7,
    longitude: 51.4,
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const subscribeToLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (loc) => {
          const coords: LatLng = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setDriverLocation(coords);
          setLocationLoaded(true);

          mapRef.current?.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        }
      );
    };

    subscribeToLocation();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const activeOrder = useSelector(
    (state: RootState) => state.product.activeOrder
  );

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 35.6892,
          longitude: 51.389,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {locationLoaded && driverLocation && (
          <>
            <Marker
              coordinate={driverLocation}
              title={t("cart.deliverer")}
              pinColor="orange"
            />
            <Polyline
              coordinates={[driverLocation, restaurantLocation, userLocation]}
              strokeColor="orange"
              strokeWidth={4}
            />
          </>
        )}

        <Marker coordinate={restaurantLocation} title={t("cart.restaurant")} />
        <Marker coordinate={userLocation} title={t("cart.yourLocation")} />
      </MapView>

      <View className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4 shadow-xl">
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View className="flex-1">
            <Text className="font-bold text-base">{t("cart.driver")}</Text>
            <Text className="text-xs text-gray-500">
              {t("cart.orderId", { id: activeOrder?.id ?? 0 })}
            </Text>
          </View>
          <TouchableOpacity className="bg-green-600 p-2 rounded-full ml-2">
            <Ionicons name="chatbubble-ellipses" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-orange-400 p-2 rounded-full ml-2">
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="font-semibold mb-1">
            {t("cart.yourDeliveryTime")}
          </Text>
          <Text className="text-sm mb-2">
            {t("cart.estimatedTime", { time: "8:30 - 9:15 PM" })}
          </Text>

          <View className="flex-row justify-between items-center">
            <MaterialIcons name="restaurant" size={20} color="orange" />
            <View className="w-28 h-px bg-gray-300 mx-1" />
            <MaterialIcons name="shopping-bag" size={20} color="orange" />
            <View className="w-28 h-px bg-gray-300 mx-1" />
            <MaterialIcons name="motorcycle" size={20} color="orange" />
          </View>
        </View>

        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-3">
            <Text className="font-semibold mb-1">{t("cart.order")}</Text>
            {activeOrder?.items?.map((it) => (
              <Text
                key={it.id ?? String(Math.random())}
                className="text-sm text-gray-600"
              >
                {it?.quantity ?? 0} x{" "}
                {t(`products.${it.id}.title`, {
                  defaultValue: it?.title ?? "",
                })}
              </Text>
            ))}
          </View>
          <View className="items-end">
            <Text className="font-bold text-lg">
              {formatCurrency(
                Number(activeOrder?.total?.toFixed(2) || "0"),
                i18n.language
              )}
            </Text>
            {activeOrder?.discountPercent ? (
              <Text className="text-xs text-gray-500">
                {t("cart.savedAmount", {
                  amount: activeOrder.discountAmount.toFixed(2),
                })}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default LiveDeliveryMap;
