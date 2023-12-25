import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditProfile from "@/pages/worker/edit-profile";
import RequestJob from "@/pages/worker/request-job";
import DetailJob from "@/pages/worker/detail-job";
import Home from "@/pages/App";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import EditProfileClient from "@/pages/client/edit-profile";
import AvailableWorker from "@/pages/client/available-worker";
import DetailWorker from "@/pages/client/detail-worker";
import JobDetail from "@/pages/client/job-detail";
import Negosiasi from "@/pages/client/negosiasi";
import Payment from "@/pages/client/payment";
import Category from "@/pages/client/category";
import NotFound from "@/pages/404";
// import ProtectedRoute from "./protected-route";

const App = () => {
  const router = createBrowserRouter([
    // {
    //   element: <ProtectedRoute />,
    //   children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/profile/worker/edit", element: <EditProfile /> },
        { path: "/job/request", element: <RequestJob /> },
        { path: "/job/detail/:id", element: <DetailJob /> },
        { path: "/profile/client/edit", element: <EditProfileClient /> },
        { path: "/client/available-worker", element: <AvailableWorker /> },
        { path: "/client/detail-worker", element: <DetailWorker /> },
        { path: "/client/job-detail", element: <JobDetail /> },
        { path: "/client/job-detail/negosiasi", element: <Negosiasi /> },
        { path: "/client/payment", element: <Payment /> },
        { path: "/category", element: <Category /> },
        { path: "*", element: <NotFound /> },
    //   ],
    // },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
