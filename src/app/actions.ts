"use server";

import { headers } from "next/headers";

import { type Schema } from "@/scripts/build";

export async function getSchema(name: string): Promise<Schema> {
  let hostUrl = headers().get("x-host-url");
  if (!hostUrl) {
    hostUrl = "https://registry.niels.foo";
  }

  const response = await fetch(`${hostUrl}/${name}.json`);

  return await response.json();
}
