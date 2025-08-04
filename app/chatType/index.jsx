import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

import homeScreenBG from "@/assets/images/AIde-homescreen-bg.png";
import { Sidebar } from "./Drawer";

export default function ChatType() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  const types = [
    {
      btnText: "Recipe",
      property: "recipe",
    },
    {
      btnText: "Itinerary",
      property: "itinerary",
    },
    {
      btnText: "General Assistance",
      property: "chat",
    },
  ];

  const handleSettingChatType = (type) => {
    router.push({
      pathname: "/chats",
      params: { token: token, chatType: type },
    });
  };

  return (
    <ImageBackground
      source={homeScreenBG}
      className="flex-1 pt-10 px-4"
      resizeMode="cover"
    >
      {/* <Sidebar /> */}
      <Text className="text-xl text-center mt-10 mb-6 text-gray-500">
        Choose desired category.
      </Text>

      {types.map(({ btnText, property }, index) => (
        <TouchableOpacity
          key={index}
          className="mb-4 p-3 rounded-lg shadow-lg bg-purple-500"
          onPress={() => handleSettingChatType(property)}
          // title={btnText}
        >
          <Text className="text-center text-white text-lg font-bold">
            {btnText}
          </Text>
        </TouchableOpacity>
      ))}
    </ImageBackground>
  );
}
