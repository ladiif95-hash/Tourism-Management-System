import { ChevronDown, Edit3, LayoutDashboard, ListChecks, LogIn, LogOut, MapPinned, PlusCircle, Search, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavItem } from "./NavItem.jsx";

export function Layout({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("tourismLoggedIn") === "true";
  const currentUser = sessionStorage.getItem("tourismUser");
  const pageAccess = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/list", label: "List Records", icon: ListChecks },
    { to: "/add", label: "Add Record", icon: PlusCircle },
    { to: "/update", label: "Update Record", icon: Edit3 },
    { to: "/report", label: "Reports", icon: Search },
    { to: "/about", label: "About", icon: MapPinned }
  ];

  function logout() {
    sessionStorage.removeItem("tourismLoggedIn");
    sessionStorage.removeItem("tourismUser");
    navigate("/login", { replace: true });
  }

  return (
    <div className="shell">
      <aside className="pillSidebar" aria-label="Primary navigation">
        <div className="brand">
          <span className="brandIcon">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbHUl867VcAFjd6UWfNdFH_MbBZsQqLM62y5RUSotQmA&s=10"
              alt="Tourism logo"
            />
          </span>
          <div className="brandText">
            <strong>Tourism Information System</strong>
            {/* <small>Destinations, visitors, hotels, and bookings in one workspace.</small> */}
          </div>
        </div>

        <nav className="sideNavLinks">
          <NavItem to="/" icon={LayoutDashboard} label="Home" />
          <NavItem to="/list" icon={ListChecks} label="List" />
          <NavItem to="/add" icon={PlusCircle} label="Add" />
          <NavItem to="/update" icon={Edit3} label="Update" />
          <NavItem to="/report" icon={Search} label="Report" />
          <NavItem to="/about" icon={MapPinned} label="About" />
          {!isLoggedIn ? (
            <NavItem to="/login" icon={LogIn} label="Login" />
          ) : (
            <button className="navItem" type="button" onClick={logout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </nav>

        <div className="sidebarGlow" aria-hidden="true" />
      </aside>

      <div className="appFrame">
        <header className="glassHeader">
          <div>
            {/* <span className="headerKicker">Management system</span> */}
            <strong>Tourism Information System</strong>
          </div>

          <details className="profileMenu">
            <summary className="profileButton">
              <span className="profileAvatar"><UserCircle size={22} /></span>
              <span className="profileText">
                <small>{isLoggedIn ? "Logged in" : "Status"}</small>
                <strong>{isLoggedIn && currentUser ? currentUser : "Guest"}</strong>
              </span>
              <ChevronDown className="profileChevron" size={18} />
            </summary>

            <div className="profileDropdown">
              <div className="profilePanelHeader">
                <span className="profileAvatar large"><UserCircle size={24} /></span>
                <div>
                  <small>Profile</small>
                  <strong>{isLoggedIn && currentUser ? currentUser : "Guest access"}</strong>
                </div>
              </div>

              <div className="profileSection">
                <span>Access pages</span>
                <div className="profileLinks">
                  {pageAccess.map(({ to, label, icon: Icon }) => (
                    <Link key={to} to={to} className="profileLink">
                      <Icon size={16} />
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="profileActions">
                {!isLoggedIn ? (
                  <Link to="/login" className="profileAction primary">
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                ) : (
                  <button className="profileAction primary" type="button" onClick={logout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </div>
          </details>
        </header>

        <main className="main">{children}</main>

        <footer className="glassFooter">
          <span>Tourism Information System</span>
          <span>Destinations, visitors, hotels, and bookings in one workspace.</span>
        </footer>
      </div>
    </div>
  );
}
