"use client";

import { DependencyList } from "react";
import useSWR, { SWRConfiguration } from "swr";

type Action<T> = () => Promise<T>;

interface UseServerActionSWROptions extends SWRConfiguration {
  shouldFetch?: boolean;
}

function generateKey<T>(action: Action<T>, deps: DependencyList = []) {
  return `${action.name || action.toString()}?${deps.join("&")}`;
}

/**
 * A hook for managing server actions in Next.js client components using SWR.
 *
 * @see https://swr.vercel.app/ for more documentation about configuration options
 *
 * ```tsx
 * const { data, error, isLoading, mutate } = useServerAction(() => action(id), [id], { shouldFetch: true });
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (!data) return null;
 *
 * return <div>{JSON.stringify(data)}</div>;
 * ```
 */
export default function useServerAction<T>(
  action: Action<T>,
  deps: DependencyList = [],
  options: UseServerActionSWROptions = {}
) {
  const { shouldFetch = true, ...rest } = options;

  return useSWR(shouldFetch ? generateKey(action, deps) : null, action, {
    ...rest,
  });
}
