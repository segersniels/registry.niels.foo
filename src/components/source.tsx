"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

import { LayoutSection, LayoutSectionTitle } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";

export default function Source({ content }: { content: string }) {
  const [isSourceCollapsed, setIsSourceCollapsed] = useState(true);

  return (
    <LayoutSection>
      <LayoutSectionTitle className="flex items-center">
        <span>Source</span>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={() => setIsSourceCollapsed(!isSourceCollapsed)}
        >
          {isSourceCollapsed ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronUpIcon className="h-4 w-4" />
          )}
        </Button>
      </LayoutSectionTitle>

      <Markdown className={isSourceCollapsed ? "hidden" : ""}>
        {`\`\`\`tsx\n${content}\n\`\`\``}
      </Markdown>
    </LayoutSection>
  );
}