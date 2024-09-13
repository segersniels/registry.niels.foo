import {
  Code as _Code,
  CodeContent,
  CodeCopyButton,
  CodeHeader,
  CodeLanguage,
} from "@/components/ui/code";

export default function Code({
  className,
  language,
  children,
  showLineNumbers,
}: {
  className?: string;
  language?: string;
  children: string;
  showLineNumbers?: boolean;
}) {
  return (
    <_Code language={language} className={className}>
      <CodeHeader>
        <CodeLanguage />
        <CodeCopyButton />
      </CodeHeader>
      <CodeContent showLineNumbers={showLineNumbers}>{children}</CodeContent>
    </_Code>
  );
}
