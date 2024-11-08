import { lazy } from "react";
import { adminRole } from "./routeConfig";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: lazy(() => import("../Pages/AdminPages/Dashboard")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/reviewRequest",
    component: lazy(() => import("../Pages/AdminPages/ReviewRequest")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/editProfileRequest",
    component: lazy(() => import("../Pages/AdminPages/EditProfileRequest")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/user/serviceProviderList",
    component: lazy(() =>
      import("../Pages/AdminPages/User/ServiceProviderList")
    ),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/user/traineeList",
    component: lazy(() => import("../Pages/AdminPages/User/TraineeList")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/user/userListing/:slug",
    component: lazy(() => import("../Pages/AdminPages/User/UserList")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/user/fullyBooked",
    component: lazy(() => import("../Pages/AdminPages/User/FullyBooked")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/reports",
    component: lazy(() => import("../Pages/AdminPages/Reports")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/platformFeedback",
    component: lazy(() => import("../Pages/AdminPages/PlatformFeedback")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/serviceProviderFeedback",
    component: lazy(() =>
      import("../Pages/AdminPages/ServiceProviderFeedback")
    ),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/exercises/addExercises/:subCategoryId",
    component: lazy(() => import("../Pages/AdminPages/Exercises/AddExercises")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/exercises/viewExercises",
    component: lazy(() =>
      import("../Pages/AdminPages/Exercises/ViewExercises")
    ),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/serviceProviderProfile/:uuid",
    component: lazy(() => import("../Pages/AdminPages/ServiceProviderProfile")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/traineeProviderProfile/:id",
    component: lazy(() => import("../Pages/AdminPages/TraineeProfile")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/exerciseSubscription",
    component: lazy(() => import("../Pages/AdminPages/ExerciseSubscription")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/subscriptions/:date",
    component: lazy(() => import("../Pages/AdminPages/Subscriptions")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/settings",
    component: lazy(() => import("../Pages/AdminPages/Settings")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/community",
    component: lazy(() => import("../Pages/AdminPages/Community")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/settings/category",
    component: lazy(() => import("../Pages/AdminPages/Settings/Category")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/settings/category/:categoryUuid/:categoryId/subCategory",
    component: lazy(() =>
      import("../Pages/AdminPages/Settings/Category/SubCategory")
    ),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/settings/promoCode",
    component: lazy(() => import("../Pages/AdminPages/PromoCode")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/reviewRequestDetail/:uuid",
    component: lazy(() =>
      import("../Pages/AdminPages/ReviewRequest/ReviewRequestDetail")
    ),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/walletSystem/walletOverview",
    component: lazy(() =>
      import("../Pages/AdminPages/WalletSystem/WalletOverview")
    ),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/Notifications",
    component: lazy(() =>
      import("../Pages/AdminPages/WalletSystem/WalletOverview")
    ),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/toolRecords",
    component: lazy(() => import("../Pages/AdminPages/ToolRecord")),
    exact: true,
    role: adminRole,
  },
  {
    path: "/admin/promoCode/users/:promoCodeId",
    component: lazy(() => import("../Pages/AdminPages/PromoCodeUser")),
    exact: true,
    role: adminRole,
  },
];
