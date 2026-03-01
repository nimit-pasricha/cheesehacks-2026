import { createHashRouter } from "react-router";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ReportPage from "./pages/ReportPage";
import HeaderLayout from "./layouts/HeaderLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FocusLayout from "./layouts/FocusLayout";
import ReportCreationPage from "./pages/ReportCreationPage";

const router = createHashRouter([
  {
    element: <FocusLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "create-report",
        element: <ReportCreationPage />,
      },
    ],
  },
  {
    path: "/",
    Component: HeaderLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "report/:reportId",
        element: <ReportPage />,
      },
    ],
  },
]);

export default router;
