"use server";

import { headers } from "next/headers";

import { type Schema } from "@/scripts/build";

export async function getSchema(component: string): Promise<Schema> {
  let hostUrl = headers().get("x-host-url");
  if (!hostUrl) {
    hostUrl = "https://registry.niels.foo";
  }

  const response = await fetch(`${hostUrl}/${component}.json`);

  return await response.json();
}
