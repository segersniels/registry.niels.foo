import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "useLocalForage",
  description:
    "A hook that simplifies local storage and indexedDB in Next.js client components.",
};

export default function Page() {
  return <Content />;
}
