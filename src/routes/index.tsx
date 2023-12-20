import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "@/pages/worker/profile";
import EditProfile from "@/pages/worker/edit-profile";
import History from "@/pages/worker/history";
import DetailHistory from "@/pages/worker/detail-history";
import RequestJob from "@/pages/worker/request-job";
import DetailJob from "@/pages/worker/detail-job";
import Home from "@/pages/App";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ProfileClient from "@/pages/client/profile";
import EditProfileClient from "@/pages/client/edit-profile";
import AvailableWorker from "@/pages/client/available-worker";
import DetailWorker from "@/pages/client/detail-worker";
import JobDetail from "@/pages/client/job-detail";
import Negosiasi from "@/pages/client/negosiasi";
import Payment from "@/pages/client/payment";
import Category from "@/pages/client/category";
import Notification from "@/pages/client/notification";
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
        { path: "/profile/worker", element: <Profile /> },
        { path: "/profile/worker/edit", element: <EditProfile /> },
        { path: "/worker/history", element: <History /> },
        { path: "/worker/history/detail", element: <DetailHistory /> },
        { path: "/worker/job/request", element: <RequestJob /> },
        { path: "/worker/job/detail", element: <DetailJob /> },
        { path: "/profile/client", element: <ProfileClient /> },
        { path: "/profile/client/edit", element: <EditProfileClient /> },
        { path: "/client/available-worker", element: <AvailableWorker /> },
        { path: "/client/detail-worker", element: <DetailWorker /> },
        { path: "/client/job-detail", element: <JobDetail /> },
        { path: "/client/job-detail/negosiasi", element: <Negosiasi /> },
        { path: "/client/payment", element: <Payment /> },
        { path: "/category", element: <Category /> },
        { path: "/client/notification", element: <Notification /> },
        { path: "*", element: <NotFound /> },
    //   ],
    // },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
