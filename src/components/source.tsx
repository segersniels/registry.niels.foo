import { getSchema } from "@/app/actions";
import Code from "@/components/code";

export default async function Source({ name }: { name: string }) {
  const source = await getSchema(name);

  return <Code language="tsx">{source.files[0].content}</Code>;
}
