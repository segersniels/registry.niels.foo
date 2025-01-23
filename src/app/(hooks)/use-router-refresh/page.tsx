import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "useRouterRefresh",
  description: "A hook to await the completion of a router refresh",
};

export default function Page() {
  return <Content />;
}
