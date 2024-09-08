import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

import Code from "./components/code";
import {
  LayoutDescription,
  LayoutSectionTitle,
  LayoutTitle,
} from "./components/layout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <LayoutTitle>{children}</LayoutTitle>,
    h2: ({ children }) => <LayoutSectionTitle>{children}</LayoutSectionTitle>,
    p: ({ children }) => <LayoutDescription>{children}</LayoutDescription>,
    pre: ({ children, ...rest }) => (
      <pre className="p-0 bg-inherit overflow-visible" {...rest}>
        {children}
      </pre>
    ),
    code: ({ children, className, ...rest }) => {
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
        <Code
          language={language}
          showLineNumbers={!["bash", "shell"].includes(language)}
          {...rest}
        >
          {code}
        </Code>
      );
    },
    ...components,
  };
}
