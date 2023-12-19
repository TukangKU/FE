import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/routes/index";
import "./styles/index.css";
import "@/styles/index.css";
import { Toaster } from "@/components/ui/toaster";

import { TokenProvider } from "@/utils/contexts/token";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </TokenProvider>
);
