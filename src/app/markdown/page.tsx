import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Markdown",
  description:
    "An opinionated markdown component that can be used to display markdown content.",
};

export default function Page() {
  return <Content />;
}
