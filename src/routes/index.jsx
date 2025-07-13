import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Accounts from "../pages/accounts/Accounts";
import Edu_services from "../pages/edu-services/Edu_services";
import Ads from "../pages/ads/Ads";
import AdDetails from "../pages/ads/ad_detail/AdDetails";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/accounts",
        element: <Accounts />,
      },
      {
        path: "edu-services",
        element: <Edu_services />,
      },
      {
        path: "/ads",
        element: <Ads />,
      },
      {
        path: "/ads/:id", // Dynamic route for ad details
        element: <AdDetails />,
      },
    ],
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);
