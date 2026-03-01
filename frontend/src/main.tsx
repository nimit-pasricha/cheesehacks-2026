import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./hooks/contexts/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>,
);
