import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "A basic chat component that can be used to display a simple chat conversation.",
};

export default function Page() {
  return <Content />;
}
