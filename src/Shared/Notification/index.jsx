import Pagination from "../Pagination";
import { Card, CardFooter } from "reactstrap";
import { useTranslation } from "react-i18next";
import { PER_PAGE_COUNT } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import { USER_NOTIFICATIONS_URL } from "../../utils/constants";
import React, { memo, useEffect, useState, useCallback } from "react";
import {
  markUserNotificationAsRead,
  getUserNotifications,
} from "../../Redux/features/User/userApi";

const Notification = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");
  const { notifications, loading, notificationCount } = useSelector(
    (state) => state.user
  );

  const [page, setPage] = useState(1);

  const handlePageChange = useCallback((page) => {
    setPage(page.selected + 1);
  }, []);

  useEffect(() => {
    fetchUserNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const markNotificationAsRead = (id) => {
    const data = {
      apiEndpoint: `${USER_NOTIFICATIONS_URL}${id}/`,
      requestData: JSON.stringify({ is_read: true }),
    };
    dispatch(markUserNotificationAsRead(data)).then((res) => {
      if (res.type === "markUserNotificationAsRead/fulfilled") {
        fetchUserNotifications();
      }
    });
  };

  const fetchUserNotifications = () => {
    const data = {
      apiEndpoint: `${USER_NOTIFICATIONS_URL}?page=${page}`,
    };
    dispatch(getUserNotifications(data));
  };

  return (
    <Card className={`${i18n.dir()} w-100 border-0`}>
      {loading === "pending" && <LoadingScreen />}
      <h5 className="fw-bold my-2 p-4">{t("topBar.notificationsText")}</h5>

      {notifications.length === 0 ? (
        <div className="d-flex align-items justify-content-center h-100">
          <p className="my-4">{t("topBar.noNotificationsText")}</p>
        </div>
      ) : (
        notifications.map((notification, index) => (
          <Card key={index} className={`ms-1 border-0 px-2 mb-1`}>
            <div
              className={`BorderRadius p-3 ${
                !notification.is_read && "bgNotification"
              }`}
            >
              <div>
                <p className="mb-0 small">
                  {i18n.dir() === "ltr"
                    ? notification?.body
                    : notification?.body_ar}
                </p>
              </div>

              <div
                className={`mx-1 ${
                  i18n.dir() === "ltr" ? "text-end" : "text-start"
                }`}
              >
                {!notification?.is_read && (
                  <div onClick={() => markNotificationAsRead(notification?.id)}>
                    <p className="small fw-bold mb-0 cursorPointer">
                      {t("topBar.markAsRead")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
      <CardFooter className="ltr">
        {notificationCount > PER_PAGE_COUNT && (
          <Pagination
            size={notificationCount}
            handlePageChange={handlePageChange}
            page={page}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default memo(Notification);
