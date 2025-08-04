import { Text, ScrollView } from "react-native";
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
    <ScrollView
      // style={{
      //   clipPath:
      //     "polygon(0% 0%, 100% 0%, 100% 75%, 100% 83%, 82% 74%, 0% 75%)",
      // }}
      className={`${
        message?.isAIResponse
          ? "self-start bg-blue-700"
          : "self-end bg-purple-700"
      } max-w-[75%] min-w-0 p-2 mt-4 flex-shrink-1 border rounded-md`}
    >
      <Text className="text-white">{message?.chatMessage}</Text>
    </ScrollView>
  );
};
