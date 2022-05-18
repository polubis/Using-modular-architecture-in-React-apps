// export type UserVOValues =
//   | { key: "idle" }
//   | { key: "loading" }
//   | { key: "loaded"; data: UserVO }
//   | { key: "error" };

// const DEFAULT_VALUE = { key: "idle" } as UserVOValues;

// export const userVO = (value = DEFAULT_VALUE) => {
//   return {
//     idle: () => userVO(DEFAULT_VALUE),
//     loading: () => userVO({ key: "loading" }),
//     loaded: (data: User) => userVO({ key: "loaded", data }),
//     error: () => userVO({ key: "error" }),
//     valueOf: () => value
//   };
// };

// export interface State {
//   key: string;
// }

// interface IdleState {
//   key: "idle";
// }

// export type StateMachineConfig<S extends State> = {
//   [K in keyof S]: void;
// }

// const createSM = <C extends StateMachineConfig>(config: StateMachineConfig<S>) => {};

import { User } from "../services";

type Obj = {
  [key: string]: unknown;
};

type GetFirstArgumentOfAnyFunction<T> = T extends (
  first: infer FirstArgument,
  ...args: any[]
) => any
  ? FirstArgument
  : never;

// ((data: any) => any) | (() => void);

type Configurable<C extends Obj> = {
  [K in keyof C]: C[K] extends () => void
    ? () => void
    : (
        data: GetFirstArgumentOfAnyFunction<C[K]>
      ) => GetFirstArgumentOfAnyFunction<C[K]>;
};

interface Predicate<K> {
  from: K;
  to: K | K[];
}

const SM = <C extends Obj>(config: C) => {
  const keys = Object.keys(config);

  return (...predicates: Predicate<keyof C>[]): Configurable<C> => {
    return keys.reduce((acc, key) => {}, {} as any);
  };
};

const userSM = SM({
  idle: () => {},
  loading: () => {},
  loaded: (data: User) => data,
  loaded2: (data: { id: number }) => data,
  error: () => {}
})(
  {
    from: "idle",
    to: "loading"
  },
  {
    from: "loading",
    to: ["loaded", "error"]
  },
  {
    from: "loaded",
    to: "idle"
  },
  {
    from: "error",
    to: "idle"
  }
);

// const userSM = SM.config({
//   loading: () => ({}),
//   loaded: (data: User) => ({ data }),
//   error: () => ({})
// }).allow(
// {
//   from: "idle",
//   to: "loading"
// },
// {
//   from: 'loading',
//   to: ['loaded', 'error']
// },
// {
//   from: 'loaded',
//   to: 'idle'
// },
// {
//   from: 'error',
//   to: 'idle'
// }
// );

// userSM.idle();
// userSM.loading();
// userSM.loaded(user);
// userSM.error();
// userSM.stateOf() => {key: '', data }

// type t = StateMachineConfig<{
//   loading: () => {};
//   loaded: () => {},;
//   error: () => {},;
// }>;
