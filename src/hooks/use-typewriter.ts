import { useEffect, useState } from "react";

export default function useTypewriter(text: string, speed = 50) {
  const [value, setValue] = useState("");

  /**
   * In a short interval add a letter to mimic typing of the placeholder
   */
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      if (value === text) {
        clearInterval(interval);
        return;
      }

      // Server revalidated with a different string, so don't bother continuing the current typewriter
      if (!text.startsWith(value)) {
        return clearInterval(interval);
      }

      // Add the next letter
      const updated = value + text[value.length];
      setValue(updated);
    }, speed);

    return () => clearInterval(interval);
  });

  return value;
}
