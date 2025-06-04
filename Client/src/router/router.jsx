// src/router/index.js
import { createBrowserRouter } from "react-router-dom";

// Layouts
import App from "../App"; 


// User pages
import Home from "../pages/home/Home";
import About from "../pages/minpage/about us/About";
import PrivacyPolicy from "../pages/minpage/privacyPolicy/PrivacyPolicy";
import ContactUs from "../pages/minpage/contact us/ContactUs";
import SingleBlog from "../pages/singleBlog/SingleBlog";
import Register from "../pages/user/register/Register";
import LoginPage from "../pages/user/login/Login";
import ThankYou from "../pages/minpage/thankyou/Thankyou";

// Admin pages
import AdminLayout from "@/pages/AdminPage/AdminLayout/AdminLayout";
import AdminLogin from "@/pages/AdminPage/adminLogin/AdminLogin";
import RequireAdmin from "./RequireAdmin";
import Dashboard from "@/pages/AdminPage/Dashboard/Dashboard";
import AddPost from "@/pages/AdminPage/AddPost/AddPost";
import ManageItems from "@/pages/AdminPage/AddPost/Manage Post/Manage Items";
import ManageUsers from "@/pages/AdminPage/User/manageusers/Manageusers";
import NotFoundPage from "@/pages/Page404/NotFoundPage";
import UpdatePost from "@/pages/AdminPage/AddPost/UpdatePost/UpdatePost";

const router = createBrowserRouter([
  // ✅ USER ROUTES
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about-us", element: <About /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "blogs/:id", element: <SingleBlog /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <LoginPage /> },
      { path: "thankyuu", element: <ThankYou /> },
    ],
  },

  // ✅ PUBLIC ADMIN LOGIN ROUTE
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },

  // ✅ PROTECTED ADMIN ROUTES
  {
    path: "/emmrexadmin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "add-new-post", element: <AddPost /> },
      { path: "manage-items", element: <ManageItems /> },
      { path: "update-items/:id", element: <UpdatePost /> },
      { path: "users", element: <ManageUsers /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
