import React from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import routes from "./routes";
const App = () => {
  const element = useRoutes(routes);
  return (
    <>
      <Navbar />
      {element}
    </>
  );
};

export default App;
