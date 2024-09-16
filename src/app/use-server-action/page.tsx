import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "useServerAction",
  description:
    "A hook that simplifies server action management in Next.js client components.",
};

export default function Page() {
  return <Content />;
}
