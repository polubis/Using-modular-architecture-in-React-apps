import {
  createValidator,
  minLength,
  prepare,
  required,
  ValidatorFnResult
} from "../validators";

describe("validators", () => {
  const name = "max";
  const messageFn = (limit: number) => `Max value is ${limit}`;

  const createFnResult = (
    invalid: boolean,
    message: string
  ): ValidatorFnResult => ({ invalid, message });

  const max = createValidator<number, number>(
    name,
    messageFn,
    (value, done, log, comparator) => {
      if (typeof comparator !== "number") {
        log();
        return done(false);
      }

      return done(value > comparator);
    }
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("gives option to create own validator", () => {
    expect(max().name).toBe("max");
    expect(max(5).fn(5).message).toBe(messageFn(5));
    expect(max().fn(5).invalid).toBeFalsy();
    expect(max(4).fn(5).invalid).toBeTruthy();
    expect(max(4).fn(5).message).toBeTruthy();
    expect(max(4).fn(5).message).toBeTruthy();
  });

  it("calls logger function when needed", () => {
    jest.spyOn(console, "warn");

    max().fn(5);

    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  describe("required()", () => {
    it("has correct API", () => {
      expect(required().name).toBe("required");
      expect(required().fn).toBeTruthy();
    });

    it("works for empty usage", () => {
      expect(required().fn("")).toEqual(
        createFnResult(true, "This field is required")
      );
      expect(required().fn("f")).toEqual(
        createFnResult(false, "This field is required")
      );
    });

    it("works with message as string", () => {
      expect(required(undefined, "Custom message").fn("")).toEqual(
        createFnResult(true, "Custom message")
      );
      expect(required(undefined, "Custom message").fn("f")).toEqual(
        createFnResult(false, "Custom message")
      );
    });

    it("works with message as function", () => {
      expect(required(undefined, () => "Custom message").fn("")).toEqual(
        createFnResult(true, "Custom message")
      );
      expect(required(undefined, () => "Custom message").fn("f")).toEqual(
        createFnResult(false, "Custom message")
      );
    });
  });

  describe("minLength()", () => {
    it("has correct API", () => {
      expect(minLength().name).toBe("minLength");
      expect(minLength().fn).toBeTruthy();
    });

    it("warns when after invalid usage", () => {
      jest.spyOn(console, "warn");

      minLength().fn("dd");

      expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it("works with message as string", () => {
      expect(minLength(2, "Custom message").fn("s")).toEqual(
        createFnResult(true, "Custom message")
      );
      expect(minLength(2, "Custom message").fn("sdd")).toEqual(
        createFnResult(false, "Custom message")
      );
    });

    it("works with message as function", () => {
      expect(minLength(2, () => "Custom message").fn("d")).toEqual(
        createFnResult(true, "Custom message")
      );
      expect(minLength(2, () => "Custom message").fn("fddd")).toEqual(
        createFnResult(false, "Custom message")
      );
    });
  });

  describe("prepare()", () => {
    it("gets first message", () => {
      expect(prepare(required(), minLength(2))("")).toBeTruthy();
    });

    it("returns empty string when there is lack of truthy invalid value", () => {
      expect(prepare()("")).toBeFalsy();
      expect(prepare(required())("d")).toBeFalsy();
    });
  });
});
