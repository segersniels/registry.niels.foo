import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

/**
 * Wrapper around `router.refresh()` from `next/navigation` `useRouter()`
 * to return Promise, and resolve after refresh completed.
 *
 * Use this only when you need to refresh the router imperatively,
 * and want to wait for the refresh to complete before continuing. In all
 * other cases you should probably use the router from `useRouter()` directly.
 */
export default function useRouterRefresh() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [resolve, setResolve] = useState<((value: unknown) => void) | null>(
    null,
  );

  const refresh = () => {
    return new Promise((resolve) => {
      setResolve(() => resolve);
      startTransition(() => {
        router.refresh();
      });
    });
  };

  useEffect(() => {
    if (isPending || !resolve) {
      return;
    }

    resolve(null);
    setResolve(null);
  }, [isPending, resolve]);

  return refresh;
}
