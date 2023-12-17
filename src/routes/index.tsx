import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "@/pages/App";
import Category from "@/pages/client/category";
import Notification from "@/pages/client/notification";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register"
import NotFound from "@/pages/404";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/category",
      element: <Category />,
    },
    {
      path: "/notification",
      element: <Notification />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
