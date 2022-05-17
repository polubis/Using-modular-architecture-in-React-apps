import { User } from "../services/models";

type States =
  | { key: "idle" }
  | { key: "loaded"; data: User }
  | { key: "error" };

const INIT_VALUE = {};

export const userDetailsVO = (value = INIT_VALUE) => {
  return {
    valueOf: () => value
  };
};
