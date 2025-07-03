import React, { useEffect } from "react";
import { useChatStore } from "../store/useChat.store";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";

function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);
  if (isMessagesLoading) return <MessageSkeleton />;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <p>Messages...</p>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
