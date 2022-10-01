import { User } from "@models/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const atomWithSessionStorage = <Value>(key: string, initialValue: Value) => {
  return atomWithStorage<Value>(key, initialValue, {
    getItem: (key) => {
      const storedValue = sessionStorage.getItem(key);
      if (storedValue === null) {
        throw new Error("no value stored");
      }
      return JSON.parse(storedValue);
    },
    setItem: (key, newValue) => {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    },
    removeItem: (key) => {
      sessionStorage.removeItem(key);
    },
  });
};

export const loginUserAtom = atomWithSessionStorage<Omit<User, "pw"> | null>(
  "loginUser",
  null
);

export const authorizationTokenAtom = atomWithSessionStorage<string | null>(
  "authorizationToken",
  null
);
