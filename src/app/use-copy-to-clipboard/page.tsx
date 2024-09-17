import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "useCopyToClipboard",
  description: "A hook that simplifies copying to clipboard.",
};

export default function Page() {
  return <Content />;
}
