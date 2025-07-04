import React, { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import routes from "./routes";
import { AuthProvider, useAuth } from './context/AuthContext';
import CustomCursor from "./components/CustomCursor";
import GoToTopButton from "./components/GoToTopButton";
import SocialMediaBar from "./components/SocialMediaBar";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import SkeletonLoader from "./components/SkeletonLoader";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const element = useRoutes(routes);
  const { pathname } = useLocation();
  const { admin } = useAuth();
  const { loading } = useLoading();

  const shouldHideNavbar = 
    pathname.startsWith("/admin/") ||
    pathname === "/admin-sign-in-portal" ||
    pathname === "/admin-sign-up-portal";

  return (
    <>
      {loading && <SkeletonLoader />}
      {!admin && !pathname.startsWith("/admin/dashboard") && <CustomCursor />}
      <ScrollToTop />
      {!shouldHideNavbar && <Navbar />}
      {element}
      <SocialMediaBar />
      {!shouldHideNavbar && <GoToTopButton />}
      <Footer />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  </AuthProvider>
);

export default App;