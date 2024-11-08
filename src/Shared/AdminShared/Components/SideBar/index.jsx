import SubMenu from "./SubMenu";
import React, { memo } from "react";
import { Button } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { GiWallet } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineReviews } from "react-icons/md";
import { NavItem, NavLink, Nav } from "reactstrap";
import { FaEdit, FaRunning } from "react-icons/fa";
import { useMediaQuery } from "@react-hook/media-query";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GoPersonAdd, GoPaste, GoLog, GoGear } from "react-icons/go";
import Images from "../../../../HelperMethods/Constants/ImgConstants";
import { useLocation } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const location = useLocation();

  return (
    <div
      className={`${classNames("sidebar", {
        "is-open": isOpen,
      })}`}
    >
      <div className="sidebar-header">
        <Button
          onClick={toggle}
          style={{ right: "0", color: "red" }}
          className="admin-navbar-toggler position-absolute bg-transparent border-0 fs-3 d-lg-none d-block"
        >
          &times;
        </Button>

        <img className="py-5" src={Images.LOGO_IMG} alt={"website-logo"} />
      </div>
      <div
        className="side-menu overflow-y-scroll"
        style={{ overflowY: "scroll", overflowX: "hidden" }}
      >
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink
              className={`py-3 d-flex align-items-center gap-2 ${
                location.pathname === "/admin/dashboard" ? "AdminActive" : ""
              }`}
              tag={Link}
              onClick={isSmallScreen ? toggle : undefined}
              to={"/admin/dashboard"}
            >
              <RxDashboard />
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={isSmallScreen ? toggle : undefined}
              className={`py-3 d-flex align-items-center gap-2 ${
                location.pathname === "/admin/reviewRequest"
                  ? "AdminActive"
                  : ""
              }`}
              tag={Link}
              to={"/admin/reviewRequest"}
            >
              <MdOutlineReviews />
              Review Requests
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={isSmallScreen ? toggle : undefined}
              className={`py-3 d-flex align-items-center gap-2 ${
                location.pathname === "/admin/editProfileRequest"
                  ? "AdminActive"
                  : ""
              }`}
              tag={Link}
              to={"/admin/editProfileRequest"}
            >
              <FaEdit />
              Edit Profile Requests
            </NavLink>
          </NavItem>
          <SubMenu
            location={location.pathname}
            title="Users"
            toggleSmallScreen={isSmallScreen ? toggle : undefined}
            icon={<GoPersonAdd />}
            items={submenus[0]}
            isVisible={!isSmallScreen}
          />
          <NavItem>
            <NavLink
              onClick={isSmallScreen ? toggle : undefined}
              className={`py-3 d-flex align-items-center gap-2 ${
                location.pathname === "/admin/toolRecords"
                  ? "AdminActive"
                  : ""
              }`}
              tag={Link}
              to={"/admin/toolRecords"}
            >
              <MdOutlineReviews />
              BMI/BMR Records
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`py-3 d-flex align-items-center gap-2 ${
                location.pathname === "/admin/exercises/viewExercises"
                  ? "AdminActive"
                  : ""
              }`}
              tag={Link}
              onClick={isSmallScreen ? toggle : undefined}
              to={"/admin/exercises/viewExercises"}
            >
              <FaRunning />
              Exercises
            </NavLink>
          </NavItem>
          <SubMenu
            location={location.pathname}
            title="Wallet System"
            icon={<GiWallet />}
            items={submenus[1]}
            isVisible={!isSmallScreen}
            toggleSmallScreen={isSmallScreen ? toggle : undefined}
          />
          <NavItem>
            <NavLink
              className={`py-3 d-flex align-items-center gap-2 ${
                location.pathname === "/admin/reports" ? "AdminActive" : ""
              }`}
              tag={Link}
              to={"/admin/reports"}
              onClick={isSmallScreen ? toggle : undefined}
            >
              <GoLog />
              Reports
            </NavLink>
          </NavItem>
          <SubMenu
            location={location.pathname}
            title="Feedback"
            toggleSmallScreen={isSmallScreen ? toggle : undefined}
            icon={<GoPaste />}
            items={submenus[2]}
            isVisible={!isSmallScreen}
          />
          <NavItem>
            <NavLink
              className={`py-3 d-flex align-items-center gap-2 ${
                location.pathname === "/admin/community" ? "AdminActive" : ""
              }`}
              tag={Link}
              to={"/admin/community"}
              onClick={isSmallScreen ? toggle : undefined}
            >
              <IoChatboxEllipsesOutline />
              Community
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`py-3 d-flex align-items-center gap-2 ${
                location.pathname === "/admin/settings" ? "AdminActive" : ""
              }`}
              tag={Link}
              to={"/admin/settings"}
              onClick={isSmallScreen ? toggle : undefined}
            >
              <GoGear />
              Settings
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

const submenus = [
  [
    {
      title: "Service Provider List",
      target: "/admin/user/serviceProviderList",
    },
    {
      title: "Trainee List",
      target: "/admin/user/traineeList",
    },
    {
      title: "Fully Booked",
      target: "/admin/user/fullyBooked",
    },
  ],
  [
    {
      title: "Wallet Overview",
      target: "/admin/walletSystem/walletOverview",
    },
  ],
  [
    {
      title: "Platform Feedback",
      target: "/admin/platformFeedback",
    },
    {
      title: "Service Provider Feedback",
      target: "/admin/serviceProviderFeedback",
    },
  ],
];

export default memo(SideBar);
