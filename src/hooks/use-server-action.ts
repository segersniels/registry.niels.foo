/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from "react";

type Action<T> = (...args: any[]) => Promise<T>;

/**
 * A custom hook for managing server actions in Next.js client components.
 *
 * This hook simplifies the process of calling server actions, handling loading states,
 * errors, and data management. It automatically executes the action on mount and
 * provides a refresh function for manual re-execution.
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
export default function useServerAction<T>(action: Action<T>) {
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setIsLoading(true);
    action()
      .then((data) => setValue(data))
      .catch((error) => {
        setError(error);
        setValue(null);
      })
      .finally(() => setIsLoading(false));
  }, [action]);

  /**
   * Refresh the action data on mount
   */
  useEffect(() => {
    refresh();
  }, []);

  return {
    data: value,
    error,
    isLoading,
    refresh,
  };
}
