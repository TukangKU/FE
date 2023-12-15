import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "@/pages/worker/profile";
import EditProfile from "@/pages/worker/edit-profile";
import History from "@/pages/worker/history";
import DetailHistory from "@/pages/worker/detail-history";
import RequestJob from "@/pages/worker/request-job";
import DetailJob from "@/pages/worker/detail-job";
import Home from "@/pages/home";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/profile/worker", element: <Profile /> },
    { path: "/profile/worker/edit", element: <EditProfile /> },
    { path: "/worker/history", element: <History /> },
    { path: "/worker/history/detail", element: <DetailHistory /> },
    { path: "/worker/job/request", element: <RequestJob /> },
    { path: "/worker/job/detail", element: <DetailJob /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
