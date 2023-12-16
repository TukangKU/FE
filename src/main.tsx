import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/index.tsx";
import "./styles/index.css";
import "@/styles/index.css";
import DetailHistory from "./pages/worker/detail-history.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <DetailHistory/> */}
  </React.StrictMode>
);
