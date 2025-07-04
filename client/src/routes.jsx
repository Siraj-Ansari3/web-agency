// routes.jsx
import Services from "./pages/services/Services";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio";
import Blog from "./pages/blog/Blog";
import AdminSignupPage from "./pages/AdminSignupPage";
import AdminSigninPage from "./pages/AdminSigninPage";
import BlogContent from "./pages/blog/BlogContent";
import DashboardLayout from "./pages/adminDashboard/DashboardLayout";
import DashboardHome from "./pages/adminDashboard/DashboardHome";
import DashboardBlogs from "./pages/adminDashboard/DashboardBlogs";
import DashboardWriteBlog from "./pages/adminDashboard/DashboardWriteBlog";
import DashboardSettings from "./pages/adminDashboard/DashboardSettings";
import PageBuilder from "./pages/adminDashboard/pageBuilder/PageBuilder";
import EditHomePage from "./pages/adminDashboard/pageBuilder/EditHomePage";
import EditAboutPage from "./pages/adminDashboard/pageBuilder/EditAboutPage";
import EditServicesPage from "./pages/adminDashboard/pageBuilder/EditServicesPage";
import ServiceDetail from "./pages/services/ServiceDetail";
import PortfolioDetail from "./pages/portfolio/PortfolioDetail";
import DashboardAdmins from "./pages/adminDashboard/DashboardAdmins";
import EditAdmin from "./pages/adminDashboard/EditAdmin";
import DashboardPortfolio from "./pages/adminDashboard/DashboardPortfolio";
import DashboardAddPortfolio from "./pages/adminDashboard/DashboardAddPortfolio";
import DashboardEditPortfolio from "./pages/adminDashboard/DashboardEditPortfolio";
import EditContactPage from "./pages/adminDashboard/pageBuilder/EditContactPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/services/:id", element: <ServiceDetail /> },
  { path: "/portfolio", element: <Portfolio /> },
  { path: "/portfolio/:project_id", element: <PortfolioDetail /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:id", element: <BlogContent /> },
  { path: "/contact", element: <Contact /> },

  { path: "/admin-sign-up-portal", element: <AdminSignupPage /> },
  { path: "/admin-sign-in-portal", element: <AdminSigninPage /> },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "blogs", element: <DashboardBlogs /> },
      { path: "write-blog", element: <DashboardWriteBlog /> },
      { path: "edit-blog/:id", element: <DashboardWriteBlog /> },
      { path: "portfolios", element: <DashboardPortfolio /> },
      { path: "add-portfolio", element: <DashboardAddPortfolio /> },
      { path: "edit-portfolio/:project_id", element: <DashboardEditPortfolio /> },
      { path: "settings", element: <DashboardSettings /> },
      { path: "admins", element: <DashboardAdmins /> },
      { path: "admins/edit/:email", element: <EditAdmin /> },
      { path: "page-builder", element: <PageBuilder /> },
      { path: "page-builder/home", element: <EditHomePage /> },
      { path: "page-builder/about", element: <EditAboutPage /> },
      { path: "page-builder/services", element: <EditServicesPage /> },
      { path: "page-builder/contact", element: <EditContactPage /> }

    ]
  },
  { path: "*", element: <PageNotFound /> }
];

export default routes;
