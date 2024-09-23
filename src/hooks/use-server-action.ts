"use client";

import { DependencyList, useEffect, useState } from "react";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";

type Action<T> = () => Promise<T>;

interface UseServerActionSWROptions<T> extends SWRConfiguration<T> {
  /**
   * Conditionally control when to execute the server action.
   */
  shouldFetch?: boolean;
  /**
   * Conditionally control whether to refresh the server action.
   */
  shouldRefresh?: boolean;
  /**
   * By default `useSWR` is purely in memory and caching is cleared
   * when closing the tab. Use `localStorage` to persist data across sessions.
   */
  persist?: boolean;
}

function generateKey<T>(action: Action<T>, deps: DependencyList = []) {
  return `${action.name || action.toString()}?${deps.join("&")}`;
}

type UseServerActionResponse<T> = ReturnType<typeof useSWR<T>>;

export default function useServerAction<T>(
  action: Action<T>,
  deps: DependencyList
): UseServerActionResponse<T>;

export default function useServerAction<T>(
  action: Action<T>,
  options: UseServerActionSWROptions<T>,
  deps: DependencyList
): UseServerActionResponse<T>;

/**
 * A hook for managing server actions in Next.js client components using SWR.
 *
 * @see https://swr.vercel.app/ for more documentation about configuration options
 *
 * ```tsx
 * const { data, error, isLoading, mutate } = useServerAction(() => action(id), { shouldFetch: true }, [id]);
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
  optionsOrDeps?: UseServerActionSWROptions<T> | DependencyList,
  optionalDeps: DependencyList = []
) {
  let options: UseServerActionSWROptions<T> = {},
    deps = optionalDeps;

  if (!Array.isArray(optionsOrDeps)) {
    options = optionsOrDeps as UseServerActionSWROptions<T>;
    deps = optionalDeps;
  } else {
    deps = optionsOrDeps;
  }

  const key = generateKey(action, deps);
  const {
    shouldFetch = true,
    shouldRefresh = !!options.refreshInterval,
    onSuccess,
    onError,
    persist = false,
    ...rest
  } = options;

  const { mutate } = useSWRConfig();
  const [isPersistedLoading, setIsPersistedLoading] = useState(true);

  /**
   * Sync fallback data with what we have persisted in localStorage
   */
  useEffect(() => {
    if (!persist) {
      return;
    }

    const data = localStorage.getItem(key);
    if (data) {
      mutate(key, JSON.parse(data), {
        revalidate: false,
      });

      /**
       * The default `isLoading` state of SWR only considers the
       * initial data fetching state. We need to manually set the
       * loading state to false once we have loaded in the persisted
       * data.
       */
      setIsPersistedLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const response = useSWR(shouldFetch ? key : null, action, {
    ...rest,
    refreshInterval: shouldRefresh ? options.refreshInterval : undefined,
    onSuccess: (data, key, config) => {
      if (persist) {
        localStorage.setItem(key, JSON.stringify(data));
      }
      onSuccess?.(data, key, config);
    },
    onError: (err, key, config) => {
      if (persist) {
        localStorage.removeItem(key);
      }
      onError?.(err, key, config);
    },
  });

  return {
    ...response,
    ...(persist
      ? {
          isLoading: isPersistedLoading,
        }
      : {}),
  };
}
