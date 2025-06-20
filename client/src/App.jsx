import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import routes from "./routes";


const hideNavbarOn = ["/admin-signin-portal"];

const App = () => {

  const element = useRoutes(routes);
  const { pathname } = useLocation();

  return (
    <>
      { !hideNavbarOn.includes(pathname) && <Navbar /> }
      {element}
    </>
  );
};

export default App;
