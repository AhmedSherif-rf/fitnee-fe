import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, NavItem, NavLink } from "reactstrap";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [path, setPath] = useState();
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items, toggleSmallScreen, location } = props;

  useEffect(() => {
    setPath(location);
  }, [location]);

  return (
    <div>
      <NavItem onClick={toggle}>
        <NavLink className="dropdown-toggle justify-content-between pe-5">
          <div className="py-2 d-flex align-items-center gap-2">
            {icon}
            {title}
          </div>
        </NavLink>
      </NavItem>
      <Collapse isOpen={!collapsed} navbar className="bg-dark pl-5">
        {items.map((item, index) => (
          <NavItem key={index}>
            <NavLink
              onClick={toggleSmallScreen}
              tag={Link}
              to={item.target}
              className={`py-3 d-flex align-items-center gap-2 ${
                location === item.target && path === item.target
                  ? "AdminActive"
                  : ""
              }`}
            >
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </Collapse>
    </div>
  );
};

export default SubMenu;
