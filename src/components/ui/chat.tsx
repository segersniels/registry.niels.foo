import { SendHorizonal } from "lucide-react";
import { createContext, forwardRef, useContext } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AlignmentContext = createContext<"start" | "end">("start");

type ChatAvatarProps = React.HTMLAttributes<HTMLDivElement>;

export function ChatAvatar({ className, children, ...props }: ChatAvatarProps) {
  const align = useContext(AlignmentContext);

  return (
    <div
      className={cn(
        "flex aspect-square h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full p-2",
        align === "start"
          ? "rounded-br-none bg-neutral-100 dark:bg-neutral-800"
          : "rounded-bl-none bg-chat",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type ChatBubbleProps = React.HTMLAttributes<HTMLDivElement>;

export function ChatBubble({ className, children, ...props }: ChatBubbleProps) {
  const align = useContext(AlignmentContext);

  return (
    <div
      className={cn(
        "min-h-10 overflow-hidden rounded-xl px-3 py-2",
        align === "start"
          ? "rounded-bl-none bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"
          : "rounded-br-none bg-chat text-chat-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type ChatMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  align: "start" | "end";
};

export function ChatMessage({
  children,
  className,
  align,
  ...props
}: ChatMessageProps) {
  return (
    <AlignmentContext.Provider value={align}>
      <div
        className={cn(
          "flex space-x-2",
          align === "end" && "flex-row-reverse space-x-reverse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AlignmentContext.Provider>
  );
}

type ChatProps = React.HTMLAttributes<HTMLDivElement>;

export const Chat = forwardRef<HTMLDivElement, ChatProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-1 flex-col space-y-4 overflow-y-auto sm:flex-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Chat.displayName = "Chat";

type ChatInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="text"
        className={cn("h-10 flex-grow rounded-xl", className)}
        {...props}
      />
    );
  }
);
ChatInput.displayName = "ChatInput";

export function ChatSubmit({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      type="submit"
      className={cn(
        "h-10 rounded-xl bg-chat hover:bg-chat/90 text-chat-foreground",
        className
      )}
      {...props}
    >
      {children || <SendHorizonal className="h-4 w-4" />}
    </Button>
  );
}

type ChatPromptProps = React.HTMLAttributes<HTMLFormElement>;

export const ChatForm = forwardRef<HTMLFormElement, ChatPromptProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("flex items-center space-x-2", className)}
        {...props}
      >
        {children}
      </form>
    );
  }
);
ChatForm.displayName = "ChatForm";
