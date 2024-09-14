import { createHash } from "crypto";
import localforage from "localforage";
import {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

localforage.config({
  name: "use-server-action",
});

/**
 * Represents a server action that returns a promise.
 */
type Action<T> = () => Promise<T>;

/**
 * Represents a cached value with its memoized dependencies.
 */
type CachedValue<T> = {
  data: T;
  deps: DependencyList;
};

/**
 * Generates a unique cache key prefix for the given action.
 */
function getCacheKeyPrefix<T>(action: Action<T>) {
  return createHash("md5").update(action.toString()).digest("hex");
}

/**
 * Generates a unique cache key for the given action and dependencies.
 */
function generateCacheKey<T>(action: Action<T>, deps: DependencyList): string {
  const depsString = deps
    .map((dep) =>
      typeof dep === "function" ? dep.toString() : JSON.stringify(dep)
    )
    .join("|");

  const prefix = getCacheKeyPrefix(action);
  const hash = createHash("md5").update(depsString).digest("hex");

  return `${prefix}_${hash}`;
}

/**
 * Clears all previous cache entries for the given action.
 */
async function clearPreviousCacheEntries<T>(action: Action<T>) {
  const prefix = getCacheKeyPrefix(action);
  const keys = await localforage.keys();
  const keysToRemove = keys.filter((key) => key.startsWith(prefix));

  // Remove all cache entries for the given action
  await Promise.all(keysToRemove.map((key) => localforage.removeItem(key)));
}

/**
 * An experimental hook for managing server actions in Next.js client components applying
 * the SWR pattern to serve stale data while revalidating in the background. You should probably
 * use `useServerAction` instead since this is a work in progress and may cause excessive re-renders.
 *
 * ```tsx
 * const { data, error, isLoading, refresh } = useServerAction(serverAction);
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * if (!data) return null;
 *
 * return <div>{JSON.stringify(data)}</div>;
 * ```
 */
export default function useServerActionSWR<T>(
  action: Action<T>,
  deps: DependencyList = []
) {
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cacheKey = useMemo(() => generateCacheKey(action, deps), deps);
  const memoizedAction = useCallback(action, deps);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await memoizedAction();
      setValue(data);

      await clearPreviousCacheEntries(action);
      await localforage.setItem(cacheKey, { data, deps });
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [memoizedAction, cacheKey, deps, action]);

  useEffect(() => {
    // Attempt to load the previous cached value from localforage
    localforage.getItem<CachedValue<T>>(cacheKey).then((cachedValue) => {
      if (cachedValue) {
        setValue(cachedValue.data);
      }

      // Fetch the latest data from the server after trying to load from cache
      refresh();
    });
  }, []);

  return {
    data: value,
    error,
    isLoading,
    refresh,
  };
}
