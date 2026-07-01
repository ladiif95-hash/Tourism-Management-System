import { NavLink } from "react-router-dom";

export function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "navItem active" : "navItem")}>
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
}

