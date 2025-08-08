import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Switch,
  Pressable,
  Modal,
} from "react-native";
import Header from "@/components/ui/header";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/auth";
import Toast from "react-native-toast-message";

const Divider = () => <View className="h-[1px] bg-neutral-200" />;
const Row = ({ children }: { children: React.ReactNode }) => (
  <View className="flex-row items-center justify-between py-4 px-4 bg-white">
    {children}
  </View>
);

const Settings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [language, setLanguage] = useState("English (US)");
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const dispatch = useDispatch();

  const languages = ["English (US)"];

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    dispatch(logout());
    Toast.show({ type: "success", text1: "Logged out successfully" });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden />
      <Header title="Settings" />
      <View className="flex-1">
        <View className="px-4 pt-4">
          <Text className="text-xs text-gray-400 mb-2">PROFILE</Text>
        </View>

        <Row>
          <Text className="text-base text-gray-800">Push Notification</Text>
          <Switch value={pushEnabled} onValueChange={setPushEnabled} />
        </Row>
        <Divider />
        <Row>
          <Text className="text-base text-gray-800">Location</Text>
          <Switch value={locationEnabled} onValueChange={setLocationEnabled} />
        </Row>
        <Divider />
        <Pressable onPress={() => setLangModalVisible(true)}>
          <Row>
            <Text className="text-base text-gray-800">Language</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-sm text-gray-500">{language}</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </Row>
        </Pressable>

        <View className="px-4 pt-6">
          <Text className="text-xs text-gray-400 mb-2">OTHER</Text>
        </View>

        <Pressable>
          <Row>
            <Text className="text-base text-gray-800">About Ticketis</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </Row>
        </Pressable>
        <Divider />
        <Pressable>
          <Row>
            <Text className="text-base text-gray-800">Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </Row>
        </Pressable>
        <Divider />
        <Pressable>
          <Row>
            <Text className="text-base text-gray-800">
              Terms and Conditions
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </Row>
        </Pressable>

        <View className="px-4 mt-8">
          <Pressable
            onPress={() => setLogoutModalVisible(true)}
            className="bg-[#FE8C00] rounded-full py-3 items-center"
          >
            <Text className="text-white font-semibold">Log Out</Text>
          </Pressable>
        </View>
      </View>

      {/* Language Modal */}
      <Modal
        visible={langModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setLangModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white rounded-t-3xl p-4">
            <View className="items-center py-2">
              <View className="w-14 h-1.5 bg-gray-300 rounded-full" />
            </View>
            <Text className="text-base font-semibold mb-3">
              Select Language
            </Text>
            {languages.map((lang) => (
              <Pressable
                key={lang}
                onPress={() => setLanguage(lang)}
                className={`flex-row items-center justify-between p-3 border rounded-xl mb-3 ${
                  language === lang ? "border-[#FE8C00]" : "border-gray-200"
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                    <Text>🏳️</Text>
                  </View>
                  <Text className="text-base">{lang}</Text>
                </View>
                {language === lang && (
                  <Ionicons name="checkmark-circle" size={20} color="#FE8C00" />
                )}
              </Pressable>
            ))}
            <Pressable
              onPress={() => setLangModalVisible(false)}
              className="bg-[#FE8C00] rounded-full py-3 items-center mt-2"
            >
              <Text className="text-white font-semibold">Select</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={logoutModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white rounded-t-3xl p-4">
            <View className="items-center py-2">
              <View className="w-14 h-1.5 bg-gray-300 rounded-full" />
            </View>

            <Text className="text-lg font-semibold mb-2 text-center">
              Log Out
            </Text>
            <Text className="text-gray-500 mb-5 text-center">
              Do you want to log out?
            </Text>

            <View className="flex-row gap-3">
              <Pressable
                className="flex-1 h-12 rounded-full bg-gray-100 items-center justify-center"
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                className="flex-1 h-12 rounded-full bg-[#FE8C00] items-center justify-center"
                onPress={handleConfirmLogout}
              >
                <Text className="text-white font-semibold">Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Settings;
