import { useState, useEffect } from 'react';

/**
 * Simple implementation of localstorage hook.
 * Only supports string values.
 *
 * Also simplistic type casting solution. Should be more thorough if more use cases are needed.
 */
export function useLocalStorage<T extends string>(key: string, initialValue: T) {
  const readValue = (): T => {
    if (typeof window === 'undefined') return initialValue;
    const item = window.localStorage.getItem(key);
    return (item !== null ? item : initialValue) as T;
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T) => {
    setStoredValue(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(e.newValue as T);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
}
