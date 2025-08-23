import { Text, ScrollView, View } from "react-native";
import React from "react";

type Props = {
  message: {
    _id: string;
    chatMessage: string;
    isAIResponse: boolean;
    isSaved: boolean;
    sentAt: string;
  };
};

export const MessageCard = ({ message }: Props) => {
  return (
    <View
      className={`relative ${
        message?.isAIResponse
          ? "self-start bg-[#368ccc]"
          : "self-end bg-[#5f6368]"
      } max-w-[75%] min-w-0 p-2 mb-5 flex-shrink-1 rounded-md`}
    >
      {/* <View className="absolute -right-0.5 bottom-[0px] bg-[#5f6368] rotate-45 h-3 w-2"></View> */}
      <Text className="text-white">{message?.chatMessage}</Text>
    </View>
  );
};
