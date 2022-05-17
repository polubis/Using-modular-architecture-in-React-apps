import { User } from "../services/models";

export type UserVOValues =
  | { key: "idle" }
  | { key: "loading" }
  | { key: "loaded"; data: User }
  | { key: "error" };

const DEFAULT_VALUE = { key: "idle" } as UserVOValues;

export const userVO = (value = DEFAULT_VALUE) => {
  return {
    idle: () => userVO(DEFAULT_VALUE),
    loading: () => userVO({ key: "loading" }),
    loaded: (data: User) => userVO({ key: "loaded", data }),
    error: () => userVO({ key: "error" }),
    valueOf: () => value
  };
};
