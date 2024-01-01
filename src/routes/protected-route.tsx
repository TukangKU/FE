import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token, role, client, worker } = useToken();

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/profile",
    "/profile/worker/edit",
    "/job/request",
    "/job/detail/:id",
    "/profile/client/edit",
    "/client/available-worker",
    "/client/detail-worker",
    "/client/job-detail",
    "/client/payment",
  ];
  const workerProtected = ["/profile/worker/edit"];
  const clientProtected = [
    "/profile/client/edit",
    "/client/detail-worker",
    "/client/job-detail",
    "/client/payment",
    "/client/available-worker",
  ];

  const takeWorkerProtected = [
    "/client/detail-worker",
    "/client/job-detail",
    "/client/payment",
    "/client/available-worker",
    "/job/request",
    "/job/detail/:id",
  ];

  const jobRequestProtected = ["/job/request", "/job/detail/:id"];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (workerProtected.includes(pathname)) {
      if (role === "client") return <Navigate to="/" />;
    }

    if (clientProtected.includes(pathname)) {
      if (role === "worker") return <Navigate to="/" />;
    }
    if (takeWorkerProtected.includes(pathname)) {
      if (client.nama === "" && client.alamat === "" && client.nohp === "")
        return <Navigate to="/profile/client/edit" />;
    }
    if (jobRequestProtected.includes(pathname)) {
      if (
        worker.nama === "" &&
        worker.alamat === "" &&
        worker.nohp === "" &&
        worker.skill === null
      )
        return <Navigate to="/profile/worker/edit" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
