// routes.jsx
import Services from "./pages/services/Services";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio";
import Blog from "./pages/blog/Blog";
import AdminSigninPage from "./components/navbar/AdminSigninPage";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/portfolio", element: <Portfolio /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin-signin-portal", element: <AdminSigninPage /> },
];

export default routes;
