"use client";

import { useEffect, useState } from "react";

import { getSchema } from "@/app/actions";
import Code from "@/components/code";

export default function Source({ name }: { name: string }) {
  const [source, setSource] = useState("");

  useEffect(() => {
    getSchema(name).then((schema) => setSource(schema.files[0].content));
  }, [name]);

  return <Code language="tsx">{source}</Code>;
}
