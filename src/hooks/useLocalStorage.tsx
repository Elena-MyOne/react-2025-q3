import { useCallback, useState } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string = ''
) {
  const [savedValue, setSavedValue] = useState(
    () => localStorage.getItem(key) || initialValue
  );

  const setValue = useCallback(
    (value: string) => {
      setSavedValue(value);
      localStorage.setItem(key, value);
    },
    [key]
  );

  return [savedValue, setValue] as const;
}
