import Code from "@/components/code";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutSection,
  LayoutSectionTitle,
  LayoutTitle,
} from "@/components/layout";
import Source from "@/components/source";

import { getSchema } from "../actions";
import Example from "./example";

export default async function Page() {
  const schema = await getSchema("chat");

  return (
    <Layout>
      <LayoutTitle>{schema.name}</LayoutTitle>

      <LayoutDescription>
        A basic chat component that can be used to display a simple chat
        conversation.
      </LayoutDescription>

      <LayoutContent>
        <Example />

        <LayoutSection>
          <LayoutSectionTitle>Installation</LayoutSectionTitle>
          <Code
            language="bash"
            showLineNumbers={false}
          >{`npx shadcn add "https://registry.niels.foo/chat.json"`}</Code>
        </LayoutSection>

        <Source content={schema.files[0].content} />
      </LayoutContent>
    </Layout>
  );
}
