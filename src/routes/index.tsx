import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import ProfileClient from "@/pages/client/profile";
import EditProfileClient from "@/pages/client/edit-profile";
import AvailableWorker from "@/pages/client/available-worker";
import DetailWorker from "@/pages/client/detail-worker";

export default function Router() {

  const routes = [
    {
      path: "/profile-client",
      element: <ProfileClient />,
    },
    {
      path: "/edit-profile-client",
      element: <EditProfileClient />,
    },
    {
      path: "/available-worker",
      element: <AvailableWorker />,
    },
    {
      path: "/detail-worker",
      element: <DetailWorker />,
    },


    
    {
      path: '*',
      element: <div>404 page not found</div>,
    },
  ];


  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
