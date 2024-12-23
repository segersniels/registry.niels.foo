import { Metadata } from "next";

import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "useEnterSubmit",
  description: "A hook that simplifies form submission on enter key press.",
};

export default function Page() {
  return <Content />;
}
