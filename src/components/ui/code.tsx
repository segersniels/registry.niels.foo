"use client";

import { Clipboard, ClipboardCheck } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, prism } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeContentContextState {
  language: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const CodeContentContext = React.createContext<CodeContentContextState>({
  language: "typescript",
  content: "",
  setContent: () => {},
});

function useCodeContent() {
  return React.useContext(CodeContentContext);
}

const Code = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { language?: string }
>(({ className, language = "typescript", children, ...props }, ref) => {
  const [content, setContent] = React.useState("");

  return (
    <CodeContentContext.Provider
      value={{
        language,
        content,
        setContent,
      }}
    >
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-neutral-50 dark:bg-neutral-900 shadow overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CodeContentContext.Provider>
  );
});
Code.displayName = "Code";

const CodeHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between border-b bg-neutral-200 p-4 dark:bg-neutral-700 text-muted-foreground",
      className
    )}
    {...props}
  />
));
CodeHeader.displayName = "CodeHeader";

const CodeLanguage = React.forwardRef<
  HTMLLabelElement,
  React.HTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => {
  const { language } = useCodeContent();

  return (
    <label
      ref={ref}
      className={cn("text-xs lowercase !leading-none", className)}
      {...props}
    >
      {language || children}
    </label>
  );
});
CodeLanguage.displayName = "CodeLanguage";

type CodeCopyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CodeCopyButton = React.forwardRef<HTMLButtonElement, CodeCopyButtonProps>(
  ({ className, ...props }, ref) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const { content } = useCodeContent();

    const copyToClipboard = React.useCallback(() => {
      if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
        return;
      }

      navigator.clipboard.writeText(content).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      });
    }, [content]);

    return (
      <Button
        ref={ref}
        variant="ghost"
        onClick={copyToClipboard}
        className={cn("h-4 w-4 cursor-pointer hover:bg-inherit", className)}
        size="icon"
        {...props}
      >
        {isCopied ? (
          <ClipboardCheck className="h-4 w-4" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}
      </Button>
    );
  }
);
CodeCopyButton.displayName = "CodeCopyButton";

interface CodeContentProps {
  showLineNumbers?: boolean;
  children: string;
}

const CodeContent = React.forwardRef<HTMLDivElement, CodeContentProps>(
  ({ showLineNumbers = true, children }, ref) => {
    const { resolvedTheme = "light" } = useTheme();
    const { language, setContent } = useCodeContent();

    React.useEffect(() => {
      setContent(children);
    }, [children, setContent]);

    return (
      <div ref={ref}>
        <SyntaxHighlighter
          language={language}
          style={resolvedTheme === "dark" ? oneDark : prism}
          PreTag="div"
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            width: "100%",
            background: "transparent",
            padding: "1.5rem 1rem",
          }}
          codeTagProps={{
            style: {
              fontSize: "0.9rem",
              fontFamily: "var(--font-mono)",
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
  }
);
CodeContent.displayName = "CodeContent";

export { Code, CodeContent, CodeCopyButton, CodeHeader, CodeLanguage };
