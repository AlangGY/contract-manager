import { User } from "@models/types";
import { atom } from "jotai";

export const loginUserAtom = atom<Omit<User, "pw"> | null>(null);

export const authorizationTokenAtom = atom<string | null>(null);
