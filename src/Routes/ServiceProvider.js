import { lazy } from "react";
import { serviceProviderRole } from "./routeConfig";

export const serviceProviderRoutes = [
  {
    path: "/serviceProvider/dashboard",
    component: lazy(() => import("../Pages/ServiceProviderPages/Dashboard")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: serviceProviderRole,
  },
  {
    path: "/serviceProvider/resetPassword",
    component: lazy(() =>
      import("../Pages/ServiceProviderPages/ResetPassword")
    ),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: serviceProviderRole,
  },
  {
    path: "/serviceProvider/subscriber",
    component: lazy(() => import("../Pages/ServiceProviderPages/TraineeList")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: serviceProviderRole,
  },
  {
    path: "/serviceProvider/subscription",
    component: lazy(() => import("../Pages/ServiceProviderPages/Subscription")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: serviceProviderRole,
  },
  {
    path: "/serviceProvider/paymentHistory",
    component: lazy(() =>
      import("../Pages/ServiceProviderPages/PaymentHistory")
    ),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: serviceProviderRole,
  },
  {
    path: "/serviceProvider/editProfile/:roleType",
    component: lazy(() => import("../Pages/ServiceProviderPages/EditProfile")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: serviceProviderRole,
  }, 
  {
    path: "serviceProvider/notifications",
    component: lazy(() => import("../Pages/ServiceProviderPages/Notifications")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: serviceProviderRole,
  },
];
