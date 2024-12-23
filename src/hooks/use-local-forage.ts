import localForage from "localforage";
import { useCallback, useEffect, useState } from "react";

/**
 * A custom hook that provides persistent state management using localForage.
 *
 * This hook allows you to store and retrieve data in the browser's local storage or IndexedDB,
 * providing a persistent state that survives page reloads and browser restarts.
 *
 * ```tsx
 * import useLocalForage from "@/hooks/use-local-forage";
 *
 * export default function Example() {
 *   const [value, setValue, isInitialized] = useLocalForage("myKey", "initialValue");
 *
 *   if (!isInitialized) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <p>Current value: {value}</p>
 *       <button onClick={() => setValue("New value")}>Update value</button>
 *     </div>
 *   );
 * }
 * ```
 */
export default function useLocalForage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, boolean] {
  const event = `event:${key}`;
  const [isInitialized, setIsInitialized] = useState(false);
  const [storedValue, setStoredValue] = useState(initialValue);

  const retrieve = useCallback(async () => {
    try {
      const value: T | null = await localForage.getItem(key);
      setStoredValue(value == null ? initialValue : value);
    } catch (err) {
      console.error(err);
    }
  }, [initialValue, setStoredValue, key]);

  const store = useCallback(
    async (value: T) => {
      try {
        setStoredValue(value);
        await localForage.setItem(key, value);
      } catch (err) {
        console.error(err);
      } finally {
        window.dispatchEvent(new Event(event));
      }
    },
    [key, event, setStoredValue]
  );

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    localForage.config({
      name: "foo",
    });

    retrieve().then(() => {
      setIsInitialized(true);
    });
  }, [isInitialized, retrieve]);

  useEffect(() => {
    window.addEventListener(event, retrieve);

    return () => {
      window.removeEventListener(event, retrieve);
    };
  }, [event, retrieve]);

  return [storedValue, store, isInitialized];
}
