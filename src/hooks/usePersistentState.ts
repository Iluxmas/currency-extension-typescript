import { useState, useEffect } from 'react';

export const usePersistentState = <T>(initialValue: T, key: string): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    chrome.storage.local.get(key).then((res) => {
      if (res[key]) {
        setValue(res[key]);
      }
    });

    const listener = (change: { [key: string]: chrome.storage.StorageChange }): void => {
      if (change[key]) {
        setValue(change[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  const setPersistentValue = (newValue: T): void => {
    setValue(newValue);
    chrome.storage.local.set({ [key]: newValue });
  };

  return [value, setPersistentValue];
};
