import { NavLink } from "react-router-dom";
import React from "react";
import "./NavItem.css";

function NavItem({ 
  iconLink: Icon,
  route, 
  placeholder
}) {
  return (
    <NavLink to={route} className={({ isActive }) => (isActive ? "active" : "")}>
        <div className="d-flex">
            <Icon className="nav-icon" />
            {placeholder}
        </div>
    </NavLink>
  );
}

export default NavItem;