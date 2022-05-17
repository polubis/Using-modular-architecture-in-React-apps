export interface ValidatorFnResult {
  message: string;
  invalid: boolean;
}

export type DoneFn = (invalid: boolean) => ValidatorFnResult;

export type ValidatorFn<T> = (value: T) => ValidatorFnResult;

export type EnhancedValidatorFn<T, C> = (value: T, done: DoneFn, log: () => void, comparator: C) => ValidatorFnResult;

export type Message = string | ((comparator: unknown) => string);

export interface Validator<T> {
  name: string;
  fn: ValidatorFn<T>;
}

const createValidatorFnResult = (
  message: string,
  invalid: boolean
): ValidatorFnResult => ({
  message,
  invalid
});

const extractMessage = <C>(message: Message, comparator?: C): string => 
  typeof message === 'function' ? message(comparator) : message;

const logInvalidUsage = (name: string): void => {
  console.warn(
    `
      Invalid usage of ${name} validator detected. 
      Check comparator type or value type.
    `
  )
}

export const createValidator = <T, C>(
  name: string,
  defaultMessage: Message,
  fn: EnhancedValidatorFn<T, C>,
) => (...[comparator, message]: [comparator?: C, message?: Message]): Validator<T> => {
  const finalMessage = extractMessage(message ?? defaultMessage, comparator)

  return {
    name,
    fn: (value) => fn(
      value, 
      (invalid) => createValidatorFnResult(finalMessage, invalid), 
      () => logInvalidUsage(name), 
      comparator as C
    )
  }
}

export const required = createValidator<string, undefined>("required", 'This field is required', (value, done) => {
  return done(value === '');
});

export const minLength = createValidator<string | unknown[], number>("minLength", (c) => `Minimum length is ${c}`, (value, done, log, comparator) => {
  if (!comparator) {
    log();
    return done(false);
  }
  
  return done(value.length < comparator);
});

export const prepare = <V>(...fns: Validator<V>[]) => (value: V): string => {
  for (let i = 0; i < fns.length; i++) {
    const result = fns[i].fn(value);

    if (result.invalid) return result.message 
  }

  return '';
}

