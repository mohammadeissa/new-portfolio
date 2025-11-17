"use client";

import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      {isOpen && <ChatWindow />}
      <ChatBubble isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  );
}
