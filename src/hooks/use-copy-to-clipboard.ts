import { useCallback, useState } from "react";

interface Props {
  timeout?: number;
}

export default function useCopyToClipboard(props: Props = { timeout: 2000 }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(
    (value: string) => {
      if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
        return;
      }

      if (!value) {
        return;
      }

      navigator.clipboard.writeText(value).then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, props.timeout);
      });
    },
    [props.timeout]
  );

  return { isCopied, copyToClipboard };
}
