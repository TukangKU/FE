import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/routes/index";
import "./styles/index.css";
import "@/styles/index.css";
import App from "./routes";
import { Toaster } from "@/components/ui/toaster";

import { TokenProvider } from "@/utils/contexts/token";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  <TokenProvider>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </TokenProvider>
);
