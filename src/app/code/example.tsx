import SimpleCode from "@/components/code";
import { LayoutSection } from "@/components/layout";
import {
  Code,
  CodeContent,
  CodeCopyButton,
  CodeHeader,
  CodeLanguage,
} from "@/components/ui/code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Example() {
  return (
    <LayoutSection>
      <Tabs defaultValue="example">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="source">Source</TabsTrigger>
        </TabsList>

        <TabsContent value="example">
          <Code language="typescript">
            <CodeHeader>
              <CodeLanguage />
              <CodeCopyButton />
            </CodeHeader>

            <CodeContent>
              {`const [value, setValue] = useState("");`}
            </CodeContent>
          </Code>
        </TabsContent>

        <TabsContent value="source">
          <SimpleCode language="tsx">
            {`<Code language="typescript">
  <CodeHeader>
    <CodeLanguage />
    <CodeCopyButton />
  </CodeHeader>

  <CodeContent>
    {\`const [value, setValue] = useState("");\`}
  </CodeContent>
</Code>`}
          </SimpleCode>
        </TabsContent>
      </Tabs>
    </LayoutSection>
  );
}
