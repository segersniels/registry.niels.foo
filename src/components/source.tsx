"use client";

import { useEffect, useState } from "react";

import { getSchema } from "@/app/actions";
import Code from "@/components/code";

export default function Source({ component }: { component: string }) {
  const [source, setSource] = useState("");

  useEffect(() => {
    getSchema(component).then((schema) => setSource(schema.files[0].content));
  }, [component]);

  return <Code language="tsx">{source}</Code>;
}
