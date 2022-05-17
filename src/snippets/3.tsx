import * as React from "react";
import { render } from "react-dom";
import { useLoginForm } from "../final";

function App() {
  const [data, errors, change] = useLoginForm();

  return (
    <form>
      <input name="login" value={data.login} onChange={change} />
      <p>{errors.login}</p>
      <input
        name="password"
        type="password"
        value={data.password}
        onChange={change}
      />
      <p>{errors.password}</p>
    </form>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
