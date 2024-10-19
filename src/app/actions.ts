"use server";

import { headers } from "next/headers";

import { type Schema } from "@/scripts/build";

async function getOrigin() {
  const headersList = await headers();
  const host = headersList.get("X-Forwarded-Host");
  const proto = headersList.get("X-Forwarded-Proto");

  return `${proto}://${host}`;
}

export async function getSchema(name: string): Promise<Schema> {
  let hostUrl = await getOrigin();
  if (!hostUrl) {
    hostUrl = "https://registry.niels.foo";
  }

  const response = await fetch(`${hostUrl}/${name}.json`);

  return await response.json();
}
