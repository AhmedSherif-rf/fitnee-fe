import { lazy } from "react";
import { guestRole } from "./routeConfig";

export const guestRoutes = [
  {
    path: "/guest/serviceProviderList/:roleType",
    component: lazy(() => import("../Pages/GuestPages/ServiceProviderList")),
    exact: true,
    isPublic: true,
    role: guestRole,
    theme: "dark",
    isGuest: true,
  },
  {
    path: "/guest/serviceProviderProfile/:uuid/:id",
    component: lazy(() => import("../Pages/GuestPages/ServiceProviderProfile")),
    exact: true,
    isPublic: true,
    role: guestRole,
    theme: "dark",
    isGuest: true,
  },
  {
    path: "/guest/serviceProvider/subscription/:uuid",
    component: lazy(() =>
      import("../Pages/GuestPages/ServiceProviderSubscription")
    ),
    exact: true,
    isPublic: true,
    role: guestRole,
    theme: "dark",
    isGuest: true,
  },
  {
    path: "/guest/services",
    component: lazy(() => import("../Pages/GuestPages/Service")),
    exact: true,
    isPublic: true,
    role: guestRole,
    theme: "dark",
    isGuest: true,
  },
  {
    path: "/guest/exercises/:uuid",
    component: lazy(() => import("../Pages/GuestPages/Exercise")),
    exact: true,
    isPublic: true,
    role: guestRole,
    theme: "dark",
    isGuest: true,
  },
];
