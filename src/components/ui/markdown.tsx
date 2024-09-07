"use client";

import { Clipboard, ClipboardCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { memo, useCallback, useState } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import gfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MarkdownCodeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  language: string;
  children: string;
  showLineNumbers?: boolean;
}

const MarkdownCode = memo(function MarkdownCode({
  className,
  language,
  children,
  showLineNumbers = true,
  ...props
}: MarkdownCodeProps) {
  const { resolvedTheme = "light" } = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  }, []);

  return (
    <div
      className={cn(
        "rounded-lg border bg-neutral-50 dark:bg-neutral-900 shadow overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b bg-neutral-200 px-4 dark:bg-neutral-700 text-muted-foreground">
        <p className="text-xs lowercase !leading-none">{language}</p>
        <Button
          variant="ghost"
          onClick={() => copyToClipboard(children)}
          className="h-4 w-4 cursor-pointer hover:bg-inherit"
          size="icon"
        >
          {isCopied ? (
            <ClipboardCheck className="h-4 w-4" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
        </Button>
      </div>

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
            fontFamily: "var(--font-geist-mono)",
          },
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
});

interface MarkdownProps extends Options {
  showLineNumbers?: boolean;
}

export const Markdown = memo(function Markdown({
  children,
  className,
  showLineNumbers = true,
  ...props
}: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn(
        "prose prose-neutral break-words dark:prose-invert prose-p:leading-relaxed prose-pre:overflow-visible prose-pre:bg-inherit prose-pre:p-0",
        className
      )}
      remarkPlugins={[gfm]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        code({ children, className, ...rest }) {
          const match = /language-(\w+)/.exec(className || "");

          if (!match) {
            return (
              <code
                {...rest}
                className={cn("font-semibold text-primary", className)}
              >
                {children}
              </code>
            );
          }

          const code = String(children).replace(/\n$/, "");
          const language = match[1];

          return (
            <MarkdownCode
              language={language}
              showLineNumbers={showLineNumbers}
              {...rest}
            >
              {code}
            </MarkdownCode>
          );
        },
      }}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
});
