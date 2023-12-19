import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/profile/worker",
    "/profile/worker/edit",
    "/worker/history",
    "/worker/history/detail",
    "/worker/job/request",
    "/worker/job/detail",
    "/profile/client",
    "/profile/client/edit",
    "/client/detail-worker",
    "/client/job-detail",
    "/client/job-detail/negosiasi",
    "/client/payment",
    "/client/notification",
  ];
  const workerProtected = [
    "/profile/worker",
    "/profile/worker/edit",
    "/worker/history",
    "/worker/history/detail",
    "/worker/job/request",
    "/worker/job/detail",
  ];
  const clientProtected = [
    "/profile/client",
    "/profile/client/edit",
    "/client/detail-worker",
    "/client/job-detail",
    "/client/job-detail/negosiasi",
    "/client/payment",
    "/client/notification",
  ];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (workerProtected.includes(pathname)) {
      if (user.role === "client") return <Navigate to="/" />;
    }

    if (clientProtected.includes(pathname)) {
      if (user.role === "worker") return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
