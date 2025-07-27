import { View, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Home Page</Text>
      <Text className="font-xl mt-8 text-gray-600">
        The list of products will be displayed here.
      </Text>
    </View>
  );
};
export default HomeScreen;
