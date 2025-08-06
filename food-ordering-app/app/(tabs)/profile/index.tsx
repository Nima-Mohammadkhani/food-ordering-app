import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import Button from "@/components/ui/Button";
import Header from "@/components/ui/header";
import Input from "@/components/ui/Input";
import { logout } from "@/redux/slice/auth";

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState({
    fullName: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: "",
  });
  
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    Toast.show({ type: "success", text1: "Logged out successfully" });
    router.replace("/auth");
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <Header title="Profile" />
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        <View className="flex gap-4">
          <View className="flex justify-center items-center self-center relative bg-white size-32 border rounded-full">
            {profileImage ? (
              <Image source={{ uri: profileImage }} className="w-full h-full rounded-full" />
            ) : (
              <Ionicons name="person-outline" size={40} />
            )}
            <TouchableOpacity
              onPress={pickImage}
              className="bg-[#FE8C00] rounded-full absolute bottom-0 right-0 p-2"
            >
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="flex gap-4">
            <Input
              label="Full Name"
              placeholder="example Tom"
              value={user.fullName}
              onChangeText={(val) => handleInputChange("fullName", val)}
            />
            <Input
              label="Date of birth"
              placeholder="19/06/1999"
              value={user.birthDate}
              onChangeText={(val) => handleInputChange("birthDate", val)}
            />
            <Input
              label="Gender"
              placeholder="Male"
              value={user.gender}
              onChangeText={(val) => handleInputChange("gender", val)}
            />
            <Input
              label="Phone"
              placeholder="09123456789"
              keyboardType="phone-pad"
              value={user.phone}
              onChangeText={(val) => handleInputChange("phone", val)}
            />
            <Input
              label="Email"
              placeholder="example@gmail.com"
              keyboardType="email-address"
              value={user.email}
              onChangeText={(val) => handleInputChange("email", val)}
            />
          </View>

          <Button
            title="Save"
            size="md"
            textClassName="text-white"
            className="bg-[#FE8C00] rounded-full"
            disabled={!user.fullName || !user.email}
            onPress={() => {
              console.log("Saved user info:", user);
              alert("Profile Saved!");
            }}
          />
          
          <Button
            title="Logout"
            size="md"
            textClassName="text-white"
            className="bg-red-500 rounded-full"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
