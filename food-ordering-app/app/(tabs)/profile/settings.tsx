import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Switch,
  Pressable,
  Modal,
  Platform,
  DevSettings,
  I18nManager,
} from "react-native";
import Header from "@/components/ui/header";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/auth";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import i18n from "@/locales";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Divider = () => <View className="h-[1px] bg-neutral-200" />;
const Row = ({ children }: { children: React.ReactNode }) => (
  <View className="flex-row items-center justify-between rounded-md py-4 px-4 bg-white">
    {children}
  </View>
);

const Settings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [language, setLanguage] = useState<"fa" | "en">(
    i18n.language === "fa" ? "fa" : "en"
  );
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const languages = useMemo(() => ["en", "fa"] as const, []);

  useEffect(() => {
    setLanguage(i18n.language === "fa" ? "fa" : "en");
  }, []);

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    dispatch(logout());
    Toast.show({ type: "success", text1: t("settings.loggedOut") });
  };

  const applyLanguage = async (lang: "en" | "fa") => {
    await AsyncStorage.setItem("appLanguage", lang);

    const enableRtl = lang === "fa";
    I18nManager.allowRTL(enableRtl);
    I18nManager.forceRTL(enableRtl);

    await i18n.changeLanguage(lang);
    setLanguage(lang);
    setLangModalVisible(false);

    if (Platform.OS === "web") {
      location.reload();
    } else {
      DevSettings.reload();
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <Header title={t("settings.title")} />
      <View className="flex-1 px-4">
        <View className="pt-4">
          <Text className="text-xs text-gray-400 mb-2">
            {t("settings.profileSection")}
          </Text>
        </View>

        <Row>
          <Text className="text-base text-gray-800">
            {t("settings.pushNotifications")}
          </Text>
          <Switch value={pushEnabled} onValueChange={setPushEnabled} />
        </Row>
        <Divider />
        <Row>
          <Text className="text-base text-gray-800">
            {t("settings.location")}
          </Text>
          <Switch value={locationEnabled} onValueChange={setLocationEnabled} />
        </Row>
        <Divider />
        <Pressable onPress={() => setLangModalVisible(true)}>
          <Row>
            <Text className="text-base text-gray-800">
              {t("settings.language")}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-sm text-gray-500">
                {t(`settings.languages.${language}`)}
              </Text>
              <Ionicons
                name={
                  i18n.language == "fa" ? "chevron-back" : "chevron-forward"
                }
                size={18}
                color="#9CA3AF"
              />
            </View>
          </Row>
        </Pressable>

        <View className="pt-6">
          <Text className="text-xs text-gray-400 mb-2">
            {t("settings.otherSection")}
          </Text>
        </View>

        <Pressable>
          <Row>
            <Text className="text-base text-gray-800">
              {t("settings.about")}
            </Text>
            <Ionicons
              name={i18n.language == "fa" ? "chevron-back" : "chevron-forward"}
              size={18}
              color="#9CA3AF"
            />
          </Row>
        </Pressable>
        <Divider />
        <Pressable>
          <Row>
            <Text className="text-base text-gray-800">
              {t("settings.privacyPolicy")}
            </Text>
            <Ionicons
              name={i18n.language == "fa" ? "chevron-back" : "chevron-forward"}
              size={18}
              color="#9CA3AF"
            />
          </Row>
        </Pressable>
        <Divider />
        <Pressable>
          <Row>
            <Text className="text-base text-gray-800">
              {t("settings.termsAndConditions")}
            </Text>
            <Ionicons
              name={i18n.language == "fa" ? "chevron-back" : "chevron-forward"}
              size={18}
              color="#9CA3AF"
            />
          </Row>
        </Pressable>

        <View className="px-4 mt-8">
          <Pressable
            onPress={() => setLogoutModalVisible(true)}
            className="bg-[#FE8C00] rounded-full py-3 items-center"
          >
            <Text className="text-white font-semibold">
              {t("settings.logout")}
            </Text>
          </Pressable>
        </View>
      </View>

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
              {t("settings.selectLanguage")}
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
                  <Text className="text-base">
                    {t(`settings.languages.${lang}`)}
                  </Text>
                </View>
                {language === lang && (
                  <Ionicons name="checkmark-circle" size={20} color="#FE8C00" />
                )}
              </Pressable>
            ))}
            <Pressable
              onPress={() => applyLanguage(language)}
              className="bg-[#FE8C00] rounded-full py-3 items-center mt-2"
            >
              <Text className="text-white font-semibold">
                {t("settings.select")}
              </Text>
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
              {t("settings.logoutTitle")}
            </Text>
            <Text className="text-gray-500 mb-5 text-center">
              {t("settings.logoutQuestion")}
            </Text>

            <View className="flex-row gap-3">
              <Pressable
                className="flex-1 h-12 rounded-full bg-gray-100 items-center justify-center"
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text className="text-gray-800 font-semibold">
                  {t("settings.cancel")}
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 h-12 rounded-full bg-[#FE8C00] items-center justify-center"
                onPress={handleConfirmLogout}
              >
                <Text className="text-white font-semibold">
                  {t("settings.logout")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Settings;
