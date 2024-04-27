import { useCallback, useState } from "react";

export const useAsyncError = () => {
  const [, setError] = useState<unknown>();
  const propagateError = useCallback(
    (e: unknown) => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
  return { propagateError };
};
