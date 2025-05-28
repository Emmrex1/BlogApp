import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import PrivacyPolicy from "../pages/minpage/privacyPolicy/PrivacyPolicy";
import ContactUs from "../pages/minpage/contact us/ContactUs";
import About from "../pages/minpage/about us/About";
import SingleBlog from "../pages/singleBlog/SingleBlog";
import Register from "../pages/user/register/Register";
import LoginPage from "@/pages/user/login/Login";
import AdminLayout from "@/pages/AdminPage/AdminLayout/AdminLayout";
import Dashboard from "@/pages/AdminPage/Dashboard/Dashboard";
import AddPost from "@/pages/AdminPage/AddPost/AddPost";
import ManageItems from "@/pages/AdminPage/AddPost/Manage Post/Manage Items";
import Manageusers from "@/pages/AdminPage/User/manageusers/manageusers";
import PrivateRouter from "./PrivateRouter";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/about-us",
        element: <About />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },

      {
        path: "/contact-us",
        element: <ContactUs />,
      },

      {
        path: "blogs/:id",
        element: <SingleBlog />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "dashboard",
        element: <PrivateRouter><AdminLayout /></PrivateRouter>,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },

          {
            path: "add-new-post",
            element: <AddPost />,
          },

          {
            path: "manage-items",
            element: <ManageItems />,
          },

          {
            path: "users",
            element: <Manageusers />,
          },
        ],
      },
    ],
  },
]);

export default router;
