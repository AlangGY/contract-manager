import { User } from "@models/types";
import { atom } from "jotai";

export const loginUserAtom = atom<User | null>(null);
