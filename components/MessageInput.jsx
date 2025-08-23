// components/MessageInput.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // For paper plane icon

import { initializeSocket, getSocket, disconnectSocket } from "../utils/socket";

export default function MessageInput({
  accessToken,
  chatType,
  setAllMessages,
}) {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const newSocket = initializeSocket(accessToken);
      setSocket(newSocket);

      // Listen for AI responses
      newSocket.on("response", (aiMessage) => {
        setAllMessages((prev) => [
          ...prev,
          {
            _id: Date.now().toString(),
            chatMessage: aiMessage,
            isAIResponse: true,
            isSaved: false,
            sentAt: Date.now().toString(),
          },
        ]);
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  const handleSend = () => {
    if (message.trim() === "") return;

    // Send message to backend
    socket.emit("sendMessage", message, chatType); // chatType = "chat" / "recipe" / "itinerary"

    // Update local chat immediately
    setAllMessages((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        chatMessage: message,
        isAIResponse: false,
        isSaved: false,
        sentAt: Date.now().toString(),
      },
    ]);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
      style={styles.container}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Feather name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1d",
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 7,
  },
  input: {
    flex: 1,
    maxHeight: 120,
    padding: 12,
    backgroundColor: "#2c2c2e",
    color: "#fff",
    borderRadius: 25,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#a855f7",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 4,
  },
});
