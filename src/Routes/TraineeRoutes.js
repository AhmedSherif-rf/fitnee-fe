import { lazy } from "react";
import { traineeRole } from "./routeConfig";

export const traineeRoutes = [
  {
    path: "/trainee/dashboard",
    component: lazy(() => import("../Pages/TraineePages/Dashboard")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/trainerList",
    component: lazy(() => import("../Pages/TraineePages/MyTrainerList")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/nutritionistList",
    component: lazy(() => import("../Pages/TraineePages/MyNutritionistList")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/subscriptionHistory",
    component: lazy(() => import("../Pages/TraineePages/SubscriptionDetail")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/allServiceProvider/:roleType",
    component: lazy(() => import("../Pages/TraineePages/AllServiceProvider")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/serviceProviderProfile/:uuid/:id/:role/:userRole",
    component: lazy(() =>
      import("../Pages/TraineePages/ServiceProviderProfile")
    ),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/subscription/:uuid",
    component: lazy(() => import("../Pages/TraineePages/Subscription")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/exerciseSubscription",
    component: lazy(() => import("../Pages/TraineePages/ExerciseSubscription")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/subscription/creditCardDetail",
    component: lazy(() => import("../Pages/TraineePages/CreditCardDetail")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/appDownloadLink/:hyperPayStatus",
    component: lazy(() => import("../Pages/TraineePages/AppDownloadLink")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/resetPassword",
    component: lazy(() => import("../Pages/TraineePages/ResetPassword")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/editProfile/:roleType",
    component: lazy(() => import("../Pages/TraineePages/EditProfile")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/settings",
    component: lazy(() => import("../Pages/TraineePages/Settings")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "/trainee/myWallet",
    component: lazy(() => import("../Pages/TraineePages/MyWallet")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
  {
    path: "trainee/notifications",
    component: lazy(() => import("../Pages/TraineePages/Notifications")),
    exact: true,
    isPrivate: true,
    theme: "dark",
    role: traineeRole,
  },
];
