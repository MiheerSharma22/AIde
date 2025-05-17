import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

export default function ChatType() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  const handleSettingChatType = (type) => {
    router.push({
      pathname: "/chats",
      params: { token: token, chatType: type },
    });
  };
  return (
    <View className="flex-1 pt-10 px-4 bg-white">
      <Button
        className="mb-4 p-4 bg-blue-500 rounded-lg shadow-lg"
        onPress={() => handleSettingChatType("chat")}
        title="Chat"
      />

      <Button
        className="mb-4 p-4 bg-green-500 rounded-lg shadow-lg"
        onPress={() => handleSettingChatType("recipe")}
        title="Recipe"
      />

      <Button
        className="p-4 bg-yellow-500 rounded-lg shadow-lg border"
        onPress={() => handleSettingChatType("itinerary")}
        title="Itinerary"
      />
    </View>
  );
}
