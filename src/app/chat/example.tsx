"use client";

import { useState } from "react";

import Code from "@/components/code";
import {
  Chat,
  ChatAvatar,
  ChatBubble,
  ChatForm,
  ChatInput,
  ChatMessage,
  ChatSubmit,
} from "@/components/ui/chat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Example() {
  const [value, setValue] = useState("");

  return (
    <Tabs defaultValue="example">
      <TabsList>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="source">Source</TabsTrigger>
      </TabsList>

      <TabsContent value="example">
        <Chat className="rounded-lg border bg-card p-8 shadow">
          <ChatMessage align="end">
            <ChatAvatar>🙂</ChatAvatar>
            <ChatBubble>What&apos;s up? Got any plans?</ChatBubble>
          </ChatMessage>

          <ChatMessage align="start">
            <ChatAvatar>🙃</ChatAvatar>
            <ChatBubble>Got nothing special going on, you?</ChatBubble>
          </ChatMessage>

          <ChatForm
            onSubmit={(e) => {
              e.preventDefault();
              setValue("");
            }}
          >
            <ChatInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type a message..."
            />
            <ChatSubmit disabled={!value} />
          </ChatForm>
        </Chat>
      </TabsContent>

      <TabsContent value="source">
        <Code language="tsx">
          {`<Chat className="rounded-xl border bg-card p-8 shadow">
  <ChatMessage align="end">
    <ChatAvatar>🙂</ChatAvatar>
    <ChatBubble>What&apos;s up? Got any plans?</ChatBubble>
  </ChatMessage>

  <ChatMessage align="start">
    <ChatAvatar>🙃</ChatAvatar>
    <ChatBubble>Got nothing special going on, you?</ChatBubble>
  </ChatMessage>

  <ChatForm onSubmit={(e) => {
    e.preventDefault();
    setValue('');
  }}>
    <ChatInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type a message..."
    />
    <ChatSubmit disabled={!value} />
  </ChatForm>
</Chat>`}
        </Code>
      </TabsContent>
    </Tabs>
  );
}
