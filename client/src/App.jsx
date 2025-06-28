import React, { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import routes from "./routes";
import { AuthProvider } from './context/AuthContext';
import CustomCursor from "./components/CustomCursor";
import GoToTopButton from "./components/GoToTopButton";
import SocialMediaBar from "./components/SocialMediaBar";


// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const element = useRoutes(routes);
  const { pathname } = useLocation();

    const shouldHideNavbar = 
    pathname.startsWith("/admin/") ||
    pathname === "/admin-sign-in-portal" ||
    pathname === "/admin-sign-up-portal";


  return (
    <>
      <CustomCursor />
      <AuthProvider>
        <ScrollToTop />
        {!shouldHideNavbar && <Navbar />}
        {element}
        <SocialMediaBar />
        {!shouldHideNavbar && <GoToTopButton />}
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;