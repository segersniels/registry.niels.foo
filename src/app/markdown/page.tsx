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
  const schema = await getSchema("markdown");

  return (
    <Layout>
      <LayoutTitle>{schema.name}</LayoutTitle>

      <LayoutDescription>
        An opinionated markdown component that can be used to display markdown
        content. It was a conscious choice to not include syntax highlighting
        for code blocks as I wanted to give users freedom to use their preferred
        syntax highlighter.
      </LayoutDescription>

      <LayoutContent>
        <Example />

        <LayoutSection>
          <LayoutSectionTitle>Installation</LayoutSectionTitle>
          <Code
            language="bash"
            showLineNumbers={false}
          >{`npx shadcn add "https://registry.niels.foo/markdown.json"`}</Code>
        </LayoutSection>

        <Sections />

        <Source content={schema.files[0].content} />
      </LayoutContent>
    </Layout>
  );
}
