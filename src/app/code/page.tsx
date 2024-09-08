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
import Sections from "./sections";

export default async function Page() {
  const schema = await getSchema("code");

  return (
    <Layout>
      <LayoutTitle>{schema.name}</LayoutTitle>

      <LayoutDescription>
        A basic code component that can be used to display code with syntax
        highlighting.
      </LayoutDescription>

      <LayoutContent>
        <Example />

        <LayoutSection>
          <LayoutSectionTitle>Installation</LayoutSectionTitle>
          <Code
            language="bash"
            showLineNumbers={false}
          >{`npx shadcn add "https://registry.niels.foo/code.json"`}</Code>
        </LayoutSection>

        <Sections />

        <Source content={schema.files[0].content} />
      </LayoutContent>
    </Layout>
  );
}
