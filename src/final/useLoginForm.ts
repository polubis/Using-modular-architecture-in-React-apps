import * as React from "react";
import { required, minLength, prepare } from "./validators";

interface LoginData {
  login: string;
  password: string;
}

const VALIDATORS = {
  login: prepare<LoginData["login"]>(required(), minLength(3)),
  password: prepare<LoginData["password"]>(required(), minLength(3))
};

type LoginDataValidation = Record<keyof LoginData, string>;

export const useLoginForm = () => {
  const [data, setData] = React.useState<LoginData>({
    login: "",
    password: ""
  });
  const [errors, setErrors] = React.useState<LoginDataValidation>({
    login: "",
    password: ""
  });

  const change = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const [key, value] = [e.target.name, e.target.value];

    if (key !== "login" && key !== "password")
      throw new Error("Incorrect name property in input");

    setData((prevData) => ({
      ...prevData,
      [key]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: VALIDATORS[key](value)
    }));
  }, []);

  return [data, errors, change] as const;
};
