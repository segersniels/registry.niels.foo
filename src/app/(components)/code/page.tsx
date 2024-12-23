import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Code",
  description:
    "A basic code component that can be used to display code with syntax highlighting.",
};

export default function Page() {
  return <Content />;
}
