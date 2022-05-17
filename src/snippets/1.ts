import { createValidator, Validator } from "../final";

const required = createValidator<string, undefined>(
  "required", // name
  "This field is required", // default message
  (value, done) => {
    // validation logic -> invalid when value is equal to '' string
    return done(value === "");
  }
);

export const minLength = createValidator<string | unknown[], number>(
  "minLength",
  (c) => `Minimum length is ${c}`,
  (value, done, log, comparator) => {
    //  logs case when we use that in invalid way and skips validation
    if (!comparator) {
      log();
      return done(false);
    }

    // validation logic
    return done(value.length < comparator);
  }
);

// Take all validators and run them
// If there is something invalid just return message;
export const prepare = <V>(...fns: Validator<V>[]) => (value: V): string => {
  for (let i = 0; i < fns.length; i++) {
    const result = fns[i].fn(value);

    if (result.invalid) return result.message;
  }

  return "";
};

const username = prepare(required(), minLength(5));
console.log(username("val")); // prints
