import "./App.css";
import "swiper/css";
import "./firebase.js";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import routes from "./Routes/AllRoutes";
import functions from "./utils/functions";
import { Toaster } from "react-hot-toast";
import { adminRole } from "./Routes/routeConfig";
import { PublicRoute } from "./Routes/PublicRoutes";
import AdminLayout from "./Pages/Layout/AdminLayout";
import { PrivateRoute } from "./Routes/PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";
import GeneralLayout from "./Pages/Layout/GeneralLayout";
import LoadingScreen from "./HelperMethods/LoadingScreen";
import React, { Suspense, useEffect, useState } from "react";
import { setFcmToken } from "./Redux/features/User/userSlice.js";
import { setLanguage } from "./Redux/features/Language/languageSlice";
import { getUserNotifications } from "./Redux/features/User/userApi.js";
import { getNotificationToken, onMessageListener } from "./firebase.js";
import NotificationToaster from "./Shared/NotificationToaster/index.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DEFAULT_LANGUAGE, USER_NOTIFICATIONS_URL } from "./utils/constants";

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserNotifications = () => {
    setTimeout(() => {
      if (user) {
        const data = {
          apiEndpoint: USER_NOTIFICATIONS_URL,
        };

        dispatch(getUserNotifications(data));
      }
    }, 1000);
  };

  const setToken = async () => {
    const firebaseToken = await getNotificationToken();
    if (firebaseToken) {
      dispatch(setFcmToken(firebaseToken));
    }
  };

  onMessageListener()
    .then((payload) => {
      console.log("notifications", payload);
      const body = payload.notification.body;
      const title = payload.notification.title;
      setNotification({
        title,
        body,
      });
      fetchUserNotifications();
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    })
    .catch((err) => console.log("failed: ", err));

  useEffect(() => {
    if (localStorage.getItem("Website_Language__fitnee") === null) {
      functions.setLanguageInStorage(DEFAULT_LANGUAGE);
      dispatch(setLanguage(DEFAULT_LANGUAGE));
    } else {
      dispatch(setLanguage(localStorage.getItem("Website_Language__fitnee")));
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Toaster />
      <NotificationToaster
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        notificationData={notification}
      />
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <>
                    {route.role !== adminRole ? (
                      <GeneralLayout
                        isPublic={route.isPublic}
                        isGuest={route.isGuest}
                        isPrivate={route.isPrivate}
                        isAuth={route.isAuth}
                        theme={route.theme ?? "black"}
                      >
                        <Suspense fallback={<LoadingScreen />}>
                          {!route.isPublic ? (
                            <PrivateRoute
                              props={route}
                              role={route?.role}
                              Component={Component}
                            />
                          ) : (
                            <PublicRoute
                              props={route}
                              role={route?.role}
                              Component={Component}
                            />
                          )}
                        </Suspense>
                      </GeneralLayout>
                    ) : (
                      <AdminLayout
                        isPublic={route.isPublic}
                        isGuest={route.isGuest}
                        isPrivate={route.isPrivate}
                        isAuth={route.isAuth}
                        theme={route.theme ?? "black"}
                      >
                        <Suspense fallback={<LoadingScreen />}>
                          {!route.isPublic ? (
                            <PrivateRoute
                              props={route}
                              role={route?.role}
                              Component={Component}
                            />
                          ) : (
                            <PublicRoute
                              props={route}
                              role={route?.role}
                              Component={Component}
                            />
                          )}
                        </Suspense>
                      </AdminLayout>
                    )}
                  </>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
