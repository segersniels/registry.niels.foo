import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutSection,
  LayoutSectionTitle,
  LayoutTitle,
} from "@/components/layout";
import Source from "@/components/source";
import { Markdown } from "@/components/ui/markdown";

import { getSchema } from "../actions";
import Example from "./example";

export default async function Page() {
  const schema = await getSchema("markdown");

  return (
    <Layout>
      <LayoutTitle>{schema.name}</LayoutTitle>

      <LayoutDescription>
        An opinionated markdown component that can be used to display markdown
        content with syntax highlighting for code blocks.
      </LayoutDescription>

      <LayoutContent>
        <Example />

        <LayoutSection>
          <LayoutSectionTitle>Installation</LayoutSectionTitle>
          <Markdown
            showLineNumbers={false}
          >{`\`\`\`bash\nnpx shadcn add "https://registry.niels.foo/markdown.json"\n\`\`\``}</Markdown>
        </LayoutSection>

        <Source content={schema.files[0].content} />
      </LayoutContent>
    </Layout>
  );
}
