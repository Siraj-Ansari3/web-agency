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
import GetQuoteButton from "./components/GetQuoteButton";
import { Helmet } from "react-helmet";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Utility to detect mobile devices
function isMobile() {
  if (typeof navigator !== 'undefined') {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
}

const AppContent = () => {
  const element = useRoutes(routes);
  const { pathname } = useLocation();
  const { admin } = useAuth();
  const { loading } = useLoading();

    useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-V7WZJGXP61', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  const shouldHideNavbar = 
    pathname.startsWith("/admin/") ||
    pathname === "/admin-sign-in-portal" ||
    pathname === "/admin-sign-up-portal";

  return (
    <>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V7WZJGXP61"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V7WZJGXP61');
        `}</script>
      </Helmet>
      {loading && <SkeletonLoader />}
      {!admin && !pathname.startsWith("/admin/dashboard") && !isMobile() && <CustomCursor />}
      <ScrollToTop />
      {!shouldHideNavbar && <Navbar />}
      {element}
      <SocialMediaBar />
      <GetQuoteButton />
      {!shouldHideNavbar && <GoToTopButton />}
      {!shouldHideNavbar && !pathname.startsWith("/admin/dashboard")&&<Footer />}
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