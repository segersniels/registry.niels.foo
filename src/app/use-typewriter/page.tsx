import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "useTypewriter",
  description: "A hook that simulates typing of a string.",
};

export default function Page() {
  return <Content />;
}
