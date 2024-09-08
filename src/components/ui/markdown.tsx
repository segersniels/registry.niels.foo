import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

export type MarkdownProps = Options;

export function Markdown({ children, className, ...props }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn(
        "prose prose-neutral break-words dark:prose-invert prose-p:leading-relaxed prose-pre:overflow-visible prose-pre:bg-inherit prose-pre:p-0 prose-p:m-0",
        className
      )}
      remarkPlugins={[remarkGfm]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        code({ children, className, ...rest }) {
          // const match = /language-(\w+)/.exec(className || "");
          // if (!match) {
          //   return (
          //     <code
          //       {...rest}
          //       className={cn("font-semibold text-primary", className)}
          //     >
          //       {children}
          //     </code>
          //   );
          // }
          // const code = String(children).replace(/\n$/, "");
          // const language = match[1];
          // return (
          //   <Code language={language}>
          //     <CodeHeader>
          //       <CodeLanguage />
          //       <CodeCopyButton />
          //     </CodeHeader>

          //     <CodeContent showLineNumbers>
          //       {code}
          //     </CodeContent>
          //   </Code>
          // );
          return (
            <code
              {...rest}
              className={cn("font-semibold text-primary", className)}
            >
              {children}
            </code>
          );
        },
      }}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
}
