import { View, Image, Text } from "react-native";
import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
const Slider = () => {
  return (
    <View className="relative min-h-80">
      <Image
        source={require("../assets/images/food/slider.png")}
        className="h-80"
        resizeMode="cover"
      />
      <View className="flex justify-between absolute top-0 py-16 px-6 min-h-80 w-full">
        <View className="flex flex-row justify-between items-center">
          <View className="gap-4">
            <Button
              iconRight="chevron-down"
              textClassName="text-white"
              title="Your Location"
            />
            <Button
              iconLeft="location-outline"
              textClassName="text-white"
              title="tehran"
              className="justify-between"
            />
          </View>
          <View className="flex flex-row gap-4">
            <View className="flex justify-center items-center rounded-full size-10 border-white border-2">
              <Ionicons name="search" size={20} color={"white"} />
            </View>
            <View className="flex justify-center items-center rounded-full size-10 border-white border-2">
              <Ionicons
                name="notifications-outline"
                size={20}
                color={"white"}
              />
            </View>
          </View>
        </View>
        <View className="flex gap-2">
          <Text className="text-4xl font-bold text-white">
            Provide the best
          </Text>
          <Text className="text-4xl font-bold text-white">food for you</Text>
        </View>
      </View>
    </View>
  );
};
export default Slider;
