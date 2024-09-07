import { ChevronRight } from "lucide-react";
import Link from "next/link";

import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutSection,
  LayoutSectionTitle,
  LayoutTitle,
} from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function Introduction() {
  return (
    <Layout>
      <LayoutTitle>Introduction</LayoutTitle>
      <LayoutContent>
        <LayoutDescription>
          Welcome to my opinionated collection of shadcn/ui inspired components
          with custom styling and enhanced functionality. This library is
          designed to streamline your development process and maintain
          consistency across your projects.
        </LayoutDescription>

        <LayoutSection>
          <LayoutSectionTitle>What is shadcn/ui?</LayoutSectionTitle>
          <p>
            shadcn/ui is a collection of re-usable components built using Radix
            UI and Tailwind CSS. It&apos;s not a component library, but rather a
            set of beautifully designed and accessible components that you can
            copy and paste into your apps.
          </p>
          <Link href="https://ui.shadcn.com/docs">
            <Button
              variant="ghost"
              className="hover:bg-transparent p-0 flex items-center gap-1 hover:text-primary/90"
            >
              <span>Learn more</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </LayoutSection>

        <LayoutSection>
          <LayoutSectionTitle>Key Features</LayoutSectionTitle>
          <ul className="list-disc list-inside space-y-1">
            <li>Customized shadcn/ui components</li>
            <li>TypeScript-first approach</li>
            <li>Responsive design with Tailwind CSS</li>
          </ul>
        </LayoutSection>

        <LayoutSection>
          <LayoutSectionTitle>Getting Started</LayoutSectionTitle>
          <p>
            Explore the component library to see examples and usage
            instructions. Each component is designed to be easily integrated
            into your Next.js projects.
          </p>

          <Link href="/chat">
            <Button
              variant="ghost"
              className="hover:bg-transparent p-0 flex items-center gap-1 hover:text-primary/90"
            >
              <span>Get started</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </LayoutSection>
      </LayoutContent>
    </Layout>
  );
}
