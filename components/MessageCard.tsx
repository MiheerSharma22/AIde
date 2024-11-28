import { View, Text } from "react-native";
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
      style={{
        alignSelf: message?.isAIResponse ? "flex-start" : "flex-end",
        maxWidth: "75%",
        minWidth: 0, // Minimum is zero but will expand based on content
        paddingHorizontal: 10, // Optional padding to ensure content readability
        flexShrink: 1, // Shrinks to fit the content
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      <Text>{message?.chatMessage}</Text>
    </View>
  );
};
