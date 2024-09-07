import { LayoutSection } from "@/components/layout";
import { Markdown } from "@/components/ui/markdown";
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
          <Markdown className="rounded-lg border bg-card p-8 shadow">
            {`# Lorem Ipsum\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
          </Markdown>
        </TabsContent>

        <TabsContent value="source">
          <Markdown>
            {`\`\`\`tsx
<Markdown className="rounded-lg border bg-card p-8 shadow">
  {\`# Lorem Ipsum\\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\`}
</Markdown>
\`\`\``}
          </Markdown>
        </TabsContent>
      </Tabs>
    </LayoutSection>
  );
}
