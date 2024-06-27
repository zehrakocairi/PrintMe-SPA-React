import { useState, useCallback } from "react";

// Custom useBoolean hook
function useBoolean(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(v => !v), []);

  return [value, { setTrue, setFalse, toggle }] as const;
}

export default useBoolean;