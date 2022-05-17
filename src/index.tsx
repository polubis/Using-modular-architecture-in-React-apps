import * as React from "react";
import { render } from "react-dom";

import { UsersManagement } from "./modules/users-management";

function App() {
  return <UsersManagement />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
