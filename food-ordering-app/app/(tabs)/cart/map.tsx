import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const LiveDeliveryMap = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const mapRef = useRef(null);

  const restaurantLocation = {
    latitude: 37.7447,
    longitude: -122.465,
  };

  const userLocation = {
    latitude: 37.741,
    longitude: -122.48,
  };

  useEffect(() => {
    const subscribeToLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (loc) => {
          const coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setDriverLocation(coords);
          setLocationLoaded(true);
        }
      );
    };

    subscribeToLocation();
  }, []);

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.744,
          longitude: -122.47,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {locationLoaded && (
          <>
            <Marker coordinate={driverLocation} title="Deliverer" pinColor="orange" />
            <Polyline
              coordinates={[driverLocation, restaurantLocation, userLocation]}
              strokeColor="orange"
              strokeWidth={4}
            />
          </>
        )}

        <Marker coordinate={restaurantLocation} title="Restaurant" />
        <Marker coordinate={userLocation} title="Your Location" />
      </MapView>

      <View className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4 shadow-xl">
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View className="flex-1">
            <Text className="font-bold text-base">Cristopert Dastin</Text>
            <Text className="text-xs text-gray-500">ID 213752</Text>
          </View>
          <TouchableOpacity className="bg-green-600 p-2 rounded-full ml-2">
            <Ionicons name="chatbubble-ellipses" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-orange-400 p-2 rounded-full ml-2">
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="font-semibold mb-1">Your Delivery Time</Text>
          <Text className="text-sm mb-2">Estimated 8:30 - 9:15 PM</Text>

          <View className="flex-row items-center">
            <MaterialIcons name="restaurant" size={20} color="orange" />
            <View className="w-5 h-px bg-gray-300 mx-1" />
            <MaterialIcons name="shopping-bag" size={20} color="orange" />
            <View className="w-5 h-px bg-gray-300 mx-1" />
            <MaterialIcons name="motorcycle" size={20} color="orange" />
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-semibold">Order</Text>
            <Text className="text-sm text-gray-600">2 Burger With Meat</Text>
          </View>
          <Text className="font-bold text-lg">$28.3</Text>
        </View>
      </View>
    </View>
  );
};

export default LiveDeliveryMap;
