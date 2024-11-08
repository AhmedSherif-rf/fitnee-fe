import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "reactstrap";
import Toaster from "../Toaster";
import FillBtn from "../Buttons/FillBtn";
import styles from "./style.module.scss";
import { IoMdSettings } from "react-icons/io";
import functions from "../../utils/functions";
import { useTranslation } from "react-i18next";
import OutlineBtn from "../Buttons/OutlineBtn";
import { PiCaretDownBold } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { FaKey, FaTrashCan } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import InformationModal from "../Modal/InformationModal";
import { FaBars, FaUserEdit, FaBell } from "react-icons/fa";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import Images from "../../HelperMethods/Constants/ImgConstants";
import { useLocation, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, memo, useCallback } from "react";
import {
  LOGOUT_URL,
  DELETE_ACCOUNT_URL,
  SET_USER_LANGUAGE,
  TRAINER_NUTRITIONIST_ROLE,
} from "../../utils/constants";
import { setLanguage } from "../../Redux/features/Language/languageSlice";
import {
  logout,
  deleteAccount,
  setUserLanguage,
} from "../../Redux/features/User/userApi";
import {
  ENGLISH_LANGUAGE,
  ARABIC_LANGUAGE,
  TRAINEE_TYPE,
  TRAINER_TYPE,
  NUTRITIONIST_TYPE,
} from "../../utils/constants";

const TopBar = ({ isPublic, isGuest, isPrivate, isAuth }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation("");
  const [unReadNotifications, setUnReadNotifications] = useState("");
  const { lang: currentLanguage } = useSelector((state) => state.language);
  const {
    loading: userLoading,
    user,
    unReadCount,
    notifications,
  } = useSelector((state) => state.user);

  const roleType = user?.role ? user?.role.toLowerCase() : null;

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    if (isPublic) {
      setBackgroundClass("bg-transparent");
    }

    setCollapsed(false);

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, [isPublic, location.pathname]);

  useEffect(() => {
    if (notifications) {
      setUnReadNotifications(unReadCount > 10 ? "10+" : unReadCount);
    } else {
      setUnReadNotifications(0);
    }
  }, [notifications, unReadCount]);

  useEffect(() => {
    if (isPublic && isAuth) {
      setShowNavItems(false);
    } else {
      setShowNavItems(true);
    }

    if (
      isPublic &&
      (location.pathname.startsWith("/termAndCondition/") ||
        location.pathname === "/signIn" ||
        location.pathname === "/contactUs" ||
        location.pathname === "/forgotPassword" ||
        location.pathname === "/changePassword" ||
        location.pathname === "/privacyPolicy" ||
        location.pathname === "/bmi" ||
        location.pathname === "/bmr")
    ) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }
  }, [location.pathname, isAuth, isPublic]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  const [collapsed, setCollapsed] = useState(false);
  const [collapsedServiceList, setCollapsedServiceList] = useState(false);
  const [collapsedLangList, setCollapsedLangList] = useState(false);

  const [showNavItems, setShowNavItems] = useState(true);
  const [
    showSubscriptionInformationModal,
    setShowSubscriptionInformationModal,
  ] = useState(false);

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const [backgroundClass, setBackgroundClass] = useState(
    isPublic
      ? isGuest
        ? "bg-white-custom"
        : "bg-transparent"
      : "bg-transparent"
  );

  const textClass = "text-white";

  const listenScrollEvent = () => {
    if (window.scrollY > 20) {
      setBackgroundClass("customBgDark");
    } else {
      setBackgroundClass("bg-transparent");
    }
  };

  const selectLanguage = (language) => {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language);
    functions.setLanguageInStorage(language);

    if (user) {
      const data = {
        apiEndpoint: SET_USER_LANGUAGE,
        requestData: JSON.stringify({ lang: language }),
      };
      dispatch(setUserLanguage(data));
    }
  };

  const handleSignUpClick = useCallback(() => {
    navigate("/registerAs");
  }, [navigate]);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
    document.body.style.overflow = "auto";
  };

  const handleSignInClick = useCallback(() => {
    navigate("/signIn");
  }, [navigate]);

  const handleSubscriptionInformationModalClose = useCallback(() => {
    setShowSubscriptionInformationModal(false);
  }, []);

  const handleDeleteAccountModalClose = useCallback(() => {
    setShowDeleteAccountModal(false);
  }, []);

  const handleDeleteAccountClick = useCallback(() => {
    const data = {
      apiEndpoint: DELETE_ACCOUNT_URL.replace("userId", user?.id),
    };
    dispatch(deleteAccount(data)).then((res) => {
      if (res.type === "deleteAccount/fulfilled") {
        Toaster.success(t("messages.accountDeletedText"));
        navigate("/");
      }
    });

    setShowDeleteAccountModal(false);
  }, [dispatch, navigate, user, t]);

  const handleDeleteClick = () => {
    setShowDeleteAccountModal(true);
  };

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

  const handleSubscriptionClick = useCallback(() => {
    setShowSubscriptionInformationModal(false);
    navigate("/registerAs");
  }, [navigate]);

  const handleFitneeCommunityClick = useCallback(() => {
    setShowSubscriptionInformationModal(true);
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      {userLoading === "pending" && <LoadingScreen />}
      {showTopBar && (
        <div>
          <Navbar
            className={`${styles.navbar} ${backgroundClass} p-2`}
            expand="lg"
            fixed="top"
          >
            <Link
              className="text-start d-block w-20"
              to={
                roleType === TRAINEE_TYPE
                  ? "/trainee/dashboard"
                  : roleType === TRAINER_TYPE || roleType === NUTRITIONIST_TYPE
                  ? "/serviceProvider/dashboard"
                  : "/"
              }
            >
              <img
                src={
                  location.pathname === "/"
                    ? Images.LOGO_IMG
                    : Images.SMALL_LOGO_IMG
                }
                alt={"website-logo"}
                style={{ verticalAlign: "sub" }}
              />
            </Link>
            {showNavItems && (
              <>
                <NavbarToggler
                  className={"textYellow d-lg-none d-block pb-2"}
                  onClick={toggleNavbar}
                >
                  <FaBars />
                </NavbarToggler>
                {roleType === null && (
                  <Nav className={`d-lg-flex d-none ${i18n.dir()}`} navbar>
                    <NavItem>
                      <Link
                        className={`nav-link ${styles.navLink} ${textClass} px-2`}
                        to="/"
                      >
                        <span> {t("landing.homeText")}</span>
                      </Link>
                    </NavItem>
                    <NavItem>
                      <UncontrolledDropdown
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        isOpen={isDropdownOpen}
                      >
                        <DropdownToggle
                          className={`${styles.navLink} ${textClass} bg-transparent border-0 p-0 mb-0 mt-2`}
                        >
                          <span className={`px-2`}>
                            {t("landing.servicesText")}
                          </span>
                        </DropdownToggle>
                        <DropdownMenu
                          style={{
                            right: 0,
                            left: "auto",
                            opacity: isDropdownOpen ? 1 : 0,
                          }}
                        >
                          <DropdownItem>
                            <Link
                              className="w-100 d-flex align-items-center"
                              to="/guest/serviceProviderList/trainer"
                            >
                              <p className="text-black-custom mb-0">
                                {t("landing.trainersText")}
                              </p>
                            </Link>
                          </DropdownItem>

                          <DropdownItem>
                            <Link
                              className="w-100 d-flex align-items-center"
                              to="/guest/serviceProviderList/nutritionist"
                            >
                              <p className="text-black-custom mb-0">
                                {t("landing.nutritionistsText")}
                              </p>
                            </Link>
                          </DropdownItem>

                          <DropdownItem>
                            <Link
                              className="w-100 d-flex align-items-center"
                              to="/guest/services"
                            >
                              <p className="text-black-custom mb-0">
                                {t("landing.exerciseText")}
                              </p>
                            </Link>
                          </DropdownItem>

                          <DropdownItem>
                            <Link
                              className="w-100 d-flex align-items-center"
                              to="/selectTool"
                            >
                              <p className="text-black-custom mb-0">
                                {t("calculation.toolText")}
                              </p>
                            </Link>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </NavItem>
                    <NavItem>
                      <div
                        onClick={handleFitneeCommunityClick}
                        className={`nav-link ${styles.navLink} ${textClass} px-2`}
                      >
                        <span>{t("landing.fitneeCommunityText")}</span>
                      </div>
                    </NavItem>
                    <NavItem>
                      <Link
                        className={`nav-link ${styles.navLink} ${textClass} px-2`}
                        to="/contactUs"
                      >
                        <span>{t("landing.contactUsText")}</span>
                      </Link>
                    </NavItem>
                  </Nav>
                )}
                {!isPrivate && roleType === null && (
                  <Nav className={`d-lg-flex d-none gap-2`}>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        <img
                          src={
                            currentLanguage === ENGLISH_LANGUAGE
                              ? Images.AMERICAN_FLAG_IMG
                              : Images.ARABIA_FLAG_IMG
                          }
                          alt="Flag_Image"
                        />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => selectLanguage(ARABIC_LANGUAGE)}
                        >
                          <span>
                            <img
                              src={Images.ARABIA_FLAG_IMG}
                              alt="Arabia_Flag_Image"
                            />
                          </span>
                          <span>{"العربية"}</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => selectLanguage(ENGLISH_LANGUAGE)}
                        >
                          <span>
                            <img
                              src={Images.AMERICAN_FLAG_IMG}
                              alt="America_Flag_Image"
                            />
                          </span>
                          <span>{"English (US)"}</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <FillBtn
                      className="px-3 ms-1 shadow-none"
                      text={t("landing.signUpText")}
                      handleOnClick={handleSignUpClick}
                    />
                    <OutlineBtn
                      className="px-3 shadow-none"
                      text={t("landing.signInText")}
                      handleOnClick={handleSignInClick}
                    />
                  </Nav>
                )}
                {!isGuest && !isPublic && (
                  <Nav
                    className={`d-lg-flex d-none gap-5 ${styles.nav} text-black-custom`}
                  >
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        <img
                          src={
                            currentLanguage === ENGLISH_LANGUAGE
                              ? Images.AMERICAN_FLAG_IMG
                              : Images.ARABIA_FLAG_IMG
                          }
                          alt="Flag_Image"
                        />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => selectLanguage(ARABIC_LANGUAGE)}
                        >
                          <span>
                            <img
                              src={Images.ARABIA_FLAG_IMG}
                              alt="Arabia_Flag_Image"
                            />
                          </span>
                          <span>{"العربية"}</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => selectLanguage(ENGLISH_LANGUAGE)}
                        >
                          <span>
                            <img
                              src={Images.AMERICAN_FLAG_IMG}
                              alt="America_Flag_Image"
                            />
                          </span>
                          <span>{"English (US)"}</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown>
                      <DropdownToggle className="p-0" nav>
                        <div
                          className="bgProperties rounded-circle"
                          style={{
                            backgroundImage:
                              user?.profile_pic === null
                                ? `url(${Images.USER_DUMMY_IMG})`
                                : `url(${user?.profile_pic})`,
                            width: "40px",
                            height: "40px",
                          }}
                        ></div>
                      </DropdownToggle>
                      <DropdownMenu
                        className={`custom-dropdown-menu  ${i18n.dir()}`}
                        style={{ right: 0, left: "auto" }}
                      >
                        <DropdownItem className="p-0">
                          <Link
                            className="w-100 p-1"
                            to={
                              roleType === TRAINEE_TYPE
                                ? "/trainee/dashboard"
                                : "/serviceProvider/dashboard"
                            }
                          >
                            <div className="d-flex gap-1 align-items-center text-black-custom">
                              <span className="me-2">
                                <RiDashboardFill size={16} className="mb-1" />
                              </span>
                              <p className="mb-0">
                                {t("topBar.dashboardText")}
                              </p>
                            </div>
                          </Link>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <Link
                            className="w-100 p-1"
                            to={
                              roleType === TRAINEE_TYPE
                                ? "/trainee/notifications"
                                : "/serviceProvider/notifications"
                            }
                          >
                            <div className="d-flex gap-1 align-items-center text-black-custom">
                              <span className="me-2">
                                <FaBell size={16} className="mb-1" />
                              </span>
                              <span className="d-flex gap-1 align-items-center justify-content-between w-100">
                                <p className="mb-0">
                                  {t("topBar.notificationsText")}{" "}
                                </p>
                                {parseInt(unReadNotifications) > 0 && (
                                  <span
                                    className={`text-white bg-danger px-2 py-0 fw-bold ${styles.notificationCount}`}
                                  >
                                    {unReadNotifications}
                                  </span>
                                )}
                              </span>
                            </div>
                          </Link>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <Link
                            className="w-100 p-1"
                            to={
                              roleType === TRAINEE_TYPE
                                ? "/trainee/settings"
                                : roleType === TRAINER_TYPE ||
                                  user?.role === TRAINER_NUTRITIONIST_ROLE
                                ? "/serviceProvider/editProfile/trainer"
                                : "/serviceProvider/editProfile/nutritionist"
                            }
                          >
                            <div className="d-flex gap-1 align-items-center w-100 text-black-custom">
                              <span className="me-2">
                                {roleType === TRAINEE_TYPE ? (
                                  <IoMdSettings size={16} className="mb-1" />
                                ) : (
                                  <FaUserEdit size={16} className="mb-1" />
                                )}
                              </span>
                              <p className="mb-0">
                                {roleType === TRAINEE_TYPE
                                  ? t("topBar.settingsText")
                                  : t("topBar.editProfileText")}
                              </p>
                            </div>
                          </Link>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <Link
                            className="w-100 p-1"
                            to={
                              roleType === TRAINEE_TYPE
                                ? "/trainee/resetPassword"
                                : "/serviceProvider/resetPassword"
                            }
                          >
                            <div className="d-flex gap-1 align-items-center text-black-custom">
                              <span className="me-2">
                                <FaKey size={16} className="mb-1" />
                              </span>
                              <p className="mb-0">
                                {t("topBar.changePasswordText")}
                              </p>
                            </div>
                          </Link>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <div
                            className="d-flex gap-1 align-items-center w-100 p-1 text-black-custom"
                            onClick={handleDeleteClick}
                          >
                            <span className="me-2 d-flex">
                              <FaTrashCan size={16} className="mb-1" />
                            </span>
                            <p className="mb-0">
                              {t("topBar.deleteAccountText")}
                            </p>
                          </div>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <div
                            className="d-flex gap-1 align-items-center w-100 p-1 text-black-custom cursorPointer"
                            onClick={handleLogoutClick}
                          >
                            <span className="me-2 d-flex">
                              <RiLogoutCircleLine size={16} />
                            </span>
                            <p className="mb-0">{t("topBar.logoutText")}</p>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                )}
              </>
            )}
          </Navbar>
          <Collapse
            isOpen={collapsed}
            className={`text-white w-100 ${styles.collapseScss}`}
          >
            <div className={`vh-100 bg-transparent ${"activeScroll"}`}>
              <Nav
                className={`pt-2 ${styles.togglerNav} customBgDark caret`}
                navbar
              >
                {!isPrivate && roleType === null && (
                  <div className="mt-2">
                    <NavItem className={`${styles.navItem}`}>
                      <Link to="/">
                        <span className={`px-1`}>{t("landing.homeText")}</span>
                      </Link>
                    </NavItem>

                    <NavItem
                      className={`${styles.navItem}`}
                      onClick={() =>
                        setCollapsedServiceList(!collapsedServiceList)
                      }
                    >
                      <span
                        className={`px-1 d-flex align-items-center justify-content-center`}
                      >
                        {t("landing.servicesText")}
                        <PiCaretDownBold />
                      </span>

                      <Collapse
                        isOpen={collapsedServiceList}
                        className="text-center bg-dark"
                      >
                        <Nav navbar>
                          <NavItem>
                            <Link
                              className="w-100 d-flex align-items-center"
                              to="/guest/serviceProviderList/trainer"
                            >
                              <p className="mb-0">
                                {t("landing.trainersText")}
                              </p>
                            </Link>
                          </NavItem>
                          <NavItem>
                            <Link
                              className="w-100 d-flex align-items-center"
                              to="/guest/serviceProviderList/nutritionist"
                            >
                              <p className="mb-0">
                                {t("landing.nutritionistsText")}
                              </p>
                            </Link>
                          </NavItem>
                          <NavItem>
                            <Link
                              className=" d-flex align-items-center"
                              to="/guest/services"
                            >
                              <p className="mb-0">
                                {t("landing.exerciseText")}
                              </p>
                            </Link>
                          </NavItem>

                          <NavItem>
                            <Link
                              className=" d-flex align-items-center"
                              to="/selectTool"
                            >
                              <p className="mb-0">
                                {t("calculation.toolText")}
                              </p>
                            </Link>
                          </NavItem>
                        </Nav>
                      </Collapse>
                    </NavItem>

                    <NavItem className={`${styles.navItem}`}>
                      <Link to="#" onClick={handleFitneeCommunityClick}>
                        <span className={`px-1`}>
                          {t("landing.fitneeCommunityText")}
                        </span>
                      </Link>
                    </NavItem>

                    <NavItem className={`${styles.navItem}`}>
                      <Link to="/contactUs">
                        <span className={`px-1`}>
                          {t("landing.contactUsText")}
                        </span>
                      </Link>
                    </NavItem>
                    {!isPrivate && roleType === null && (
                      <>
                        <Nav
                          className={`ml-auto d-lg-none d-block customBgDark ${styles.togglerNav}`}
                        >
                          <NavItem
                            className={`${styles.navItem}`}
                            onClick={() =>
                              setCollapsedLangList(!collapsedLangList)
                            }
                          >
                            <span className={`px-1`}>
                              <img
                                src={
                                  currentLanguage === ENGLISH_LANGUAGE
                                    ? Images.AMERICAN_FLAG_IMG
                                    : Images.ARABIA_FLAG_IMG
                                }
                                alt="Flag_Image"
                              />
                              <PiCaretDownBold />
                            </span>

                            <Collapse
                              isOpen={collapsedLangList}
                              className="text-center bg-dark"
                            >
                              <Nav navbar>
                                <NavItem>
                                  <div
                                    className="w-100 d-flex justify-content-center align-items-center py-2 text-white gap-2"
                                    onClick={() =>
                                      selectLanguage(ARABIC_LANGUAGE)
                                    }
                                  >
                                    <span>
                                      <img
                                        src={Images.ARABIA_FLAG_IMG}
                                        alt="Arabia_Flag_Image"
                                      />
                                    </span>
                                    <span>{"العربية"}</span>
                                  </div>
                                </NavItem>
                                <NavItem>
                                  <div
                                    className="w-100 d-flex justify-content-center align-items-center py-2 text-white gap-2"
                                    onClick={() =>
                                      selectLanguage(ENGLISH_LANGUAGE)
                                    }
                                  >
                                    <span>
                                      <img
                                        src={Images.AMERICAN_FLAG_IMG}
                                        alt="America_Flag_Image"
                                      />
                                    </span>
                                    <span>{"English (US)"}</span>
                                  </div>
                                </NavItem>
                              </Nav>
                            </Collapse>
                          </NavItem>
                          <div className="d-flex align-items-center flex-column">
                            <FillBtn
                              className="w-50 px-3 mb-2"
                              text={t("landing.signUpText")}
                              handleOnClick={handleSignUpClick}
                            />
                            <OutlineBtn
                              className="w-50 px-3"
                              text={t("landing.signInText")}
                              handleOnClick={handleSignInClick}
                            />
                          </div>
                        </Nav>
                      </>
                    )}
                  </div>
                )}
                {!isGuest && roleType !== null && (
                  <div>
                    <NavItem className={`${styles.NavItem} p-2`}>
                      <Link
                        className={`nav-link ${styles.NavLink}`}
                        to={
                          roleType === TRAINEE_TYPE
                            ? "/trainee/dashboard"
                            : "/serviceProvider/dashboard"
                        }
                      >
                        {t("topBar.dashboardText")}
                      </Link>
                    </NavItem>
                    <NavItem className={`${styles.NavItem} p-2`}>
                      <Link
                        className={`nav-link ${styles.NavLink}`}
                        to={
                          roleType === TRAINEE_TYPE
                            ? "/trainee/notifications"
                            : "/serviceProvider/notifications"
                        }
                      >
                        {t("topBar.notificationsText")}
                        {parseInt(unReadNotifications) > 0 && (
                          <span
                            className={`text-white bg-danger px-2 py-0 fw-bold mx-1 ${styles.notificationCount}`}
                          >
                            {unReadNotifications}
                          </span>
                        )}
                      </Link>
                    </NavItem>
                    <NavItem className={`${styles.NavItem} p-2`}>
                      <Link
                        className={`nav-link ${styles.NavLink}`}
                        to={
                          roleType === TRAINEE_TYPE
                            ? "/trainee/settings"
                            : roleType === TRAINER_TYPE ||
                              user?.role === TRAINER_NUTRITIONIST_ROLE
                            ? "/serviceProvider/editProfile/trainer"
                            : "/serviceProvider/editProfile/nutritionist"
                        }
                      >
                        {roleType === TRAINEE_TYPE
                          ? t("topBar.settingsText")
                          : t("topBar.editProfileText")}
                      </Link>
                    </NavItem>

                    <NavItem className={`${styles.NavItem} p-2`}>
                      <Link
                        className={`nav-link ${styles.NavLink}`}
                        to={
                          roleType === TRAINEE_TYPE
                            ? "/trainee/resetPassword"
                            : "/serviceProvider/resetPassword"
                        }
                      >
                        {t("topBar.changePasswordText")}
                      </Link>
                    </NavItem>

                    <NavItem className={`${styles.NavItem} p-2`}>
                      <div
                        className={`nav-link d-flex justify-content-center w-100 p-1`}
                        onClick={handleDeleteClick}
                      >
                        {t("topBar.deleteAccountText")}
                      </div>
                    </NavItem>

                    <NavItem className={`${styles.NavItem} p-2`}>
                      <div
                        className="d-flex justify-content-center w-100 p-1 cursorPointer"
                        onClick={handleLogoutClick}
                      >
                        {t("topBar.logoutText")}
                      </div>
                    </NavItem>
                    <NavItem>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          <img
                            src={
                              currentLanguage === ENGLISH_LANGUAGE
                                ? Images.AMERICAN_FLAG_IMG
                                : Images.ARABIA_FLAG_IMG
                            }
                            alt="Flag_Image"
                          />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() => selectLanguage(ARABIC_LANGUAGE)}
                          >
                            <span>
                              <img
                                src={Images.ARABIA_FLAG_IMG}
                                alt="Arabia_Flag_Image"
                              />
                            </span>
                            <span>{"العربية"}</span>
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => selectLanguage(ENGLISH_LANGUAGE)}
                          >
                            <span>
                              <img
                                src={Images.AMERICAN_FLAG_IMG}
                                alt="America_Flag_Image"
                              />
                            </span>
                            <span>{"English (US)"}</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </NavItem>
                  </div>
                )}
              </Nav>
            </div>
          </Collapse>
        </div>
      )}

      <InformationModal
        size={"md"}
        TOneClassName={"mb-4 fs-5 text-center"}
        className={"p-4"}
        isOpen={showSubscriptionInformationModal}
        onClose={handleSubscriptionInformationModalClose}
        ModalTextOne={t("landing.communityFirstText")}
        ButtonOne={
          <FillBtn
            text={t("guest.subscribeText")}
            className="py-2 w-75"
            handleOnClick={handleSubscriptionClick}
          />
        }
        ButtonTwo={
          <OutlineBtn
            text={t("guest.notNowText")}
            className="py-2 w-75"
            handleOnClick={handleSubscriptionInformationModalClose}
          />
        }
      />

      <InformationModal
        size={"md"}
        TOneClassName={"mb-4 fs-5 text-center"}
        className={"p-4"}
        isOpen={showDeleteAccountModal}
        onClose={handleDeleteAccountModalClose}
        ModalTextOne={t("guest.deleteModalText")}
        ButtonOne={
          <FillBtn
            text={t("signup.yesText")}
            className="py-2 px-5"
            disabled={userLoading === "pending" ? true : false}
            handleOnClick={handleDeleteAccountClick}
          />
        }
        ButtonTwo={
          <OutlineBtn
            text={t("guest.noText")}
            className="py-2 px-5"
            handleOnClick={handleDeleteAccountModalClose}
          />
        }
      />
    </>
  );
};

export default memo(TopBar);
