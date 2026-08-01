import {
  LayoutDashboard,
  PenLine,
  Award,
  HeartHandshake,
  GraduationCap,
  FileText,
  ClipboardCheck,
  Brain,
  Users,
  LogOut
} from "lucide-react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function LinkItem({
  to,
  icon: Icon,
  children
}) {

  return (

    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link ${
          isActive ? "active" : ""
        }`
      }
    >

      <Icon size={18} />

      <span>
        {children}
      </span>

    </NavLink>

  );
}


export default function Sidebar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();


  function handleLogout() {

    logout();

    navigate("/login");

  }


  return (

    <aside className="sidebar">

      <div className="logo">

        <div className="logo-icon">
          <HeartHandshake size={21} />
        </div>

        <div className="logo-text">
          PeerPulse
        </div>

      </div>


      {/* EMPLOYEE */}

      {user?.role === "employee" && (

        <>

          <div className="nav-section-title">
            Employee
          </div>

          <LinkItem
            to="/employee"
            icon={LayoutDashboard}
          >
            Dashboard
          </LinkItem>

          <LinkItem
            to="/employee/update"
            icon={PenLine}
          >
            Daily Update
          </LinkItem>

          <LinkItem
            to="/employee/shoutout"
            icon={HeartHandshake}
          >
            Give Shoutout
          </LinkItem>

          <LinkItem
            to="/employee/recognition"
            icon={Award}
          >
            My Recognition
          </LinkItem>

          <LinkItem
            to="/employee/development"
            icon={GraduationCap}
          >
            My Development
          </LinkItem>

        </>

      )}


      {/* TEAM LEAD */}

      {user?.role === "teamlead" && (

        <>

          <div className="nav-section-title">
            Team Lead
          </div>

          <LinkItem
            to="/teamlead"
            icon={LayoutDashboard}
          >
            Dashboard
          </LinkItem>

          <LinkItem
            to="/teamlead/reports"
            icon={FileText}
          >
            Weekly Reports
          </LinkItem>

        </>

      )}


      {/* HR */}

      {user?.role === "hr" && (

        <>

          <div className="nav-section-title">
            HR
          </div>

          <LinkItem
            to="/hr"
            icon={LayoutDashboard}
          >
            Dashboard
          </LinkItem>

          <LinkItem
            to="/hr/performance"
            icon={Users}
          >
            Employee Performance
          </LinkItem>

          <LinkItem
            to="/hr/appraisal"
            icon={Brain}
          >
            AI Appraisal
          </LinkItem>

          <LinkItem
            to="/hr/recommendations"
            icon={ClipboardCheck}
          >
            Recommendations
          </LinkItem>

        </>

      )}


      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 16,
          right: 16
        }}
      >

        <button
          className="nav-link"
          style={{
            width: "100%",
            border: "none",
            background: "transparent"
          }}
          onClick={handleLogout}
        >

          <LogOut size={18} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>

  );
}