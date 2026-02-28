import { createHashRouter } from "react-router";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

const router = createHashRouter([
  {
    path: "/",
    Component: HomePage,
    errorElement: <ErrorPage />,
  },
]);

export default router;
