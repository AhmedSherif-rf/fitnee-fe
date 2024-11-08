import React, { memo } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const NotificationToaster = (props) => {
  const { user } = useSelector((state) => state.user);
  const { showNotification, setShowNotification, notificationData } = props;

  return (
    <div className={`${styles.toaster} ${user?.lang === "en" ? "ltr" : "rtl"}`}>
      <Toast className={`${styles.toaster}`} isOpen={showNotification}>
        <ToastHeader
          className={`${styles.toasterHeader} ${
            user?.lang === "ar" ? styles.toasterHeaderArabic : ""
          }`}
          toggle={() => setShowNotification(false)}
        >
          {notificationData?.title}
        </ToastHeader>
        <ToastBody
          className={`${styles.toasterBody} ${
            user?.lang === "en" ? "ltr" : "rtl"
          }`}
        >
          {notificationData?.body}
        </ToastBody>
      </Toast>
    </div>
  );
};

export default memo(NotificationToaster);
