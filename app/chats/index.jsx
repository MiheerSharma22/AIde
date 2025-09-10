import {
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import ChatBg from "@/assets/images/chatBg.png";
import { useAuthToken } from "@/hooks/useAuthToken";
import MessageInput from "@/components/MessageInput";
import { MessageCard } from "@/components/MessageCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import AiReplyLoader from "@/components/AiReplyLoader";

export default function Chats() {
  const flatListRef = useRef();
  const { chatType } = useLocalSearchParams();
  const [allMessages, setAllMessages] = useState([]);
  const { accessToken } = useAuthToken();
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAwaitingAIReply, setIsAwaitingAIReply] = useState(false);

  const chatTypeToResultKeyMap = {
    recipe: "allUserRecipes",
    chat: "allUserMessages",
    itinerary: "allUserItineraries",
  };

  const chatTypeToAPIEndpointMap = {
    recipe: "/getAllRecipes",
    chat: "/getAllChatMessages",
    itinerary: "/getAllItineraries",
  };

  // Scroll to bottom
  const scrollToBottom = (animated = true) => {
    flatListRef.current?.scrollToEnd({ animated });
  };

  // Auto-scroll when keyboard opens
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      scrollToBottom(true);
    });
    return () => showSub.remove();
  }, []);

  // Fetch all chats
  const handleFetchAllChats = async () => {
    setIsLoading(true);
    const data = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}${chatTypeToAPIEndpointMap[chatType]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const res = await data.json();
    setAllMessages(res.data[chatTypeToResultKeyMap[chatType]]);
    setIsLoading(false);
  };

  useEffect(() => {
    accessToken && handleFetchAllChats();
  }, [accessToken]);

  return (
    <ImageBackground
      source={ChatBg}
      className="flex-1 relative"
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        {!isAtBottom && (
          <TouchableOpacity
            className="absolute bottom-20 right-2 rounded-full p-3 bg-[#47474b] z-[15]"
            onPress={() => scrollToBottom(true)}
          >
            <Feather name="chevron-down" size={24} color="white" />
          </TouchableOpacity>
        )}

        {isLoading ? (
          <SkeletonLoader />
        ) : allMessages?.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={allMessages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <MessageCard message={item} />}
            onContentSizeChange={() => scrollToBottom(false)}
            onScroll={(e) => {
              const { layoutMeasurement, contentOffset, contentSize } =
                e.nativeEvent;
              const isBottom =
                layoutMeasurement.height + contentOffset.y >=
                contentSize.height - 5;
              setIsAtBottom(isBottom);
            }}
            ListFooterComponent={isAwaitingAIReply ? <AiReplyLoader /> : null}
          />
        ) : (
          <Text className="m-auto opacity-70 text-white text-xl font-semibold tracking-wider">
            No messages yet! Start asking.
          </Text>
        )}

        <MessageInput
          accessToken={accessToken}
          chatType={chatType}
          setAllMessages={setAllMessages}
          isLoading={isLoading}
          isAwaitingAIReply={isAwaitingAIReply}
          setIsAwaitingAIReply={setIsAwaitingAIReply}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
