import "./style.scss";
import {
  Navbar,
  Button,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Card } from "reactstrap";
import { CgMenuLeft } from "react-icons/cg";
import { GoBellFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import React, { memo, useEffect, useState } from "react";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import Images from "../../../../HelperMethods/Constants/ImgConstants";
import {
  LOGOUT_URL,
  USER_NOTIFICATIONS_URL,
} from "../../../../utils/constants";
import {
  logout,
  markUserNotificationAsRead,
  getUserNotifications,
} from "../../../../Redux/features/User/userApi";
import { useTranslation } from "react-i18next";

const Topbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("");
  const { user, loading, notifications, unReadCount } = useSelector(
    (state) => state.user
  );

  const [unReadNotifications, setUnReadNotifications] = useState("");

  const handleLogoutClick = () => {
    const data = {
      apiEndpoint: LOGOUT_URL,
      requestData: { refresh: user?.tokens?.refresh, device: "web" },
    };
    dispatch(logout(data)).then((res) => {
      if (res.type === "logout/fullfiled") {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (notifications) {
      setUnReadNotifications(unReadCount > 10 ? "10+" : unReadCount);
    } else {
      setUnReadNotifications(0);
    }
  }, [notifications, unReadCount]);

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
      apiEndpoint: USER_NOTIFICATIONS_URL,
    };

    dispatch(getUserNotifications(data));
  };

  return (
    <Navbar className="navbar admin-navbar BorderRadius mb-3 p-0">
      {loading === "pending" && <LoadingScreen />}

      <Button
        color="info"
        onClick={toggleSidebar}
        className="border-0 admin-navbar-toggler"
      >
        <CgMenuLeft color="black" />
      </Button>
      <div className="d-flex gap-3 align-items-center">
        <UncontrolledDropdown>
          <DropdownToggle className="p-0" nav>
            <div className="position-relative">
              {unReadCount > 0 ? (
                <span
                  className="position-absolute rounded-circle bg-danger text-white fw-bold"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginTop: "-10px",
                    marginLeft: "10px",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {unReadNotifications}
                </span>
              ) : null}

              <GoBellFill size={24} />
            </div>
          </DropdownToggle>
          <DropdownMenu className="custom-dropdown-menu-Notifications bg-white mt-2 me-0">
            <div
              className="w-100 pt-3"
              style={{
                maxHeight: "510px",
                overflowY: "scroll",
              }}
            >
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <Card key={index} className={`ms-1 px-2 mb-1 border-0`}>
                    <div
                      className={`BorderRadius p-3 ${
                        !notification.is_read && "bgNotification"
                      }`}
                    >
                      <div>
                        <h6 className="fw-bold mb-0 small">
                          {notification?.title}
                        </h6>
                        <p className="mb-0 small">{notification?.body}</p>
                      </div>

                      <div className="mx-1 text-end">
                        {!notification?.is_read && (
                          <div
                            onClick={() =>
                              markNotificationAsRead(notification?.id)
                            }
                          >
                            <p className="small fw-bold mb-0 cursorPointer">
                              {t("topBar.markAsRead")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center">
                  <p className="text-dark">No notifications</p>
                </div>
              )}
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>

        <Nav className={`d-md-flex text-black-custom`}>
          <UncontrolledDropdown>
            <DropdownToggle className="p-0" nav>
              <div
                className="bgProperties rounded-circle"
                style={{
                  backgroundImage: `url(${Images.USER_DUMMY_IMG})`,
                  width: "40px",
                  height: "40px",
                }}
              ></div>
            </DropdownToggle>
            <DropdownMenu
              className="custom-dropdown-menu"
              style={{ right: 0, left: "auto" }}
            >
              <DropdownItem className="p-0">
                <div
                  className="d-flex align-items-center w-100 p-1 text-black-custom"
                  onClick={handleLogoutClick}
                >
                  <span className="me-2 d-flex">
                    <RiLogoutCircleLine size={16} />
                  </span>
                  <p className="mb-0">Logout</p>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
    </Navbar>
  );
};

export default memo(Topbar);
