import { createHashRouter } from "react-router";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ReportPage from "./pages/ReportPage";
import HeaderLayout from "./layouts/HeaderLayout";

const router = createHashRouter([
  {
    path: "/",
    Component: HeaderLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: HomePage,
        errorElement: <ErrorPage />,
      },
      {
        path: "report/:reportId",
        Component: ReportPage,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
