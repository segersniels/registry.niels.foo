import { getSchema } from "@/app/actions";
import Code from "@/components/code";
import { LayoutSection } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InstallationProps {
  name: string;
  url: string;
}

export default async function Installation({ name, url }: InstallationProps) {
  const source = await getSchema(name);

  return (
    <LayoutSection>
      <Tabs defaultValue="cli">
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="cli">
          <Code language="bash">{`npx shadcn add "${url}"`}</Code>
        </TabsContent>

        <TabsContent value="manual">
          <Code language="tsx">{source.files[0].content}</Code>
        </TabsContent>
      </Tabs>
    </LayoutSection>
  );
}
