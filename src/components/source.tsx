import { ChevronsUpDown } from "lucide-react";

import { getSchema } from "@/app/actions";
import Code from "@/components/code";

import { LayoutSectionTitle } from "./layout";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export default async function Source({ name }: { name: string }) {
  const source = await getSchema(name);

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 p-0 hover:bg-inherit"
        >
          <LayoutSectionTitle>Source</LayoutSectionTitle>
          <ChevronsUpDown className="w-4 h-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Code language="tsx" className="my-4">
          {source.files[0].content}
        </Code>
      </CollapsibleContent>
    </Collapsible>
  );
}
