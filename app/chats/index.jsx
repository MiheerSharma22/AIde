import {
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import ChatBg from "@/assets/images/chatBg.png";

import { useAuthToken } from "@/hooks/useAuthToken";
import MessageInput from "@/components/MessageInput";
import { MessageCard } from "@/components/MessageCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import AiReplyLoader from "@/components/AiReplyLoader";

export default function Chats() {
  const chatScrollRef = useRef();
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

  // to show the lastest messages (scroll at the every bottom of list)
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  // function to check if the user is at the very end of the scroll (latest message) or not
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // Check if user is at bottom (5px tolerance)
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;

    setIsAtBottom(isBottom);
  };

  // function to scroll to bottom of the messages list
  const scrollToBottom = (animatedScroll = false) => {
    chatScrollRef.current?.scrollToEnd({ animated: animatedScroll });
  };

  // fetch all the messages from the server
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
      {/* scroll to bottom button */}
      {!isAtBottom && (
        <TouchableOpacity
          className="absolute bottom-20 right-2 rounded-full p-3 bg-[#47474b] z-[15]"
          onPress={() => scrollToBottom(true)}
        >
          <Feather name="chevron-down" size={24} color="white" />
        </TouchableOpacity>
      )}
      {/* messages */}
      {isLoading ? (
        <SkeletonLoader />
      ) : allMessages?.length > 0 ? (
        <ScrollView
          className="rounded-md flex-1 p-4"
          ref={chatScrollRef}
          onContentSizeChange={() =>
            chatScrollRef.current?.scrollToEnd({ animated: false })
          }
          onScroll={handleScroll}
        >
          {allMessages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))}

          {isAwaitingAIReply && <AiReplyLoader />}
        </ScrollView>
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
    </ImageBackground>
  );
}
