import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


// Employee
import EmployeeDashboard
  from "./pages/employee/EmployeeDashboard";

import DailyUpdate
  from "./pages/employee/DailyUpdate";

import GiveShoutout
  from "./pages/employee/GiveShoutout";

import MyRecognition
  from "./pages/employee/MyRecognition";

import MyDevelopment
  from "./pages/employee/MyDevelopment";


// Team Lead
import TeamLeadDashboard
  from "./pages/teamlead/TeamLeadDashboard";

import WeeklyReports
  from "./pages/teamlead/WeeklyReports";

import ReviewReport
  from "./pages/teamlead/ReviewReport";


// HR
import HRDashboard
  from "./pages/hr/HRDashboard";

import EmployeePerformance
  from "./pages/hr/EmployeePerformance";

import AIAppraisal
  from "./pages/hr/AIAppraisal";

import Recommendations
  from "./pages/hr/Recommendations";


function ProtectedLayout({ children }) {

  const { user, loading } = useAuth();


  if (loading) {

    return (
      <div className="full-screen-loader">
        Loading PeerPulse...
      </div>
    );

  }


  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  return (

    <div className="app-shell">

      <Sidebar />

      <div className="main-area">

        <Navbar />

        <main className="page-content">

          {children}

        </main>

      </div>

    </div>

  );
}


function RoleRoute({
  allowedRoles,
  children
}) {

  const { user } = useAuth();


  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  if (!allowedRoles.includes(user.role)) {

    if (user.role === "employee") {

      return (
        <Navigate
          to="/employee"
          replace
        />
      );

    }


    if (user.role === "teamlead") {

      return (
        <Navigate
          to="/teamlead"
          replace
        />
      );

    }


    if (user.role === "hr") {

      return (
        <Navigate
          to="/hr"
          replace
        />
      );

    }

  }


  return children;

}


function HomeRedirect() {

  const { user } = useAuth();


  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  if (user.role === "employee") {

    return (
      <Navigate
        to="/employee"
        replace
      />
    );

  }


  if (user.role === "teamlead") {

    return (
      <Navigate
        to="/teamlead"
        replace
      />
    );

  }


  if (user.role === "hr") {

    return (
      <Navigate
        to="/hr"
        replace
      />
    );

  }


  return (
    <Navigate
      to="/login"
      replace
    />
  );

}


export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* Home */}

        <Route
          path="/"
          element={<HomeRedirect />}
        />


        {/* =========================
            EMPLOYEE
        ========================== */}

        <Route
          path="/employee"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["employee"]}
              >

                <EmployeeDashboard />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/employee/update"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["employee"]}
              >

                <DailyUpdate />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/employee/shoutout"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["employee"]}
              >

                <GiveShoutout />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/employee/recognition"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["employee"]}
              >

                <MyRecognition />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/employee/development"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["employee"]}
              >

                <MyDevelopment />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        {/* =========================
            TEAM LEAD
        ========================== */}

        <Route
          path="/teamlead"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={[
                  "teamlead"
                ]}
              >

                <TeamLeadDashboard />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/teamlead/reports"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={[
                  "teamlead"
                ]}
              >

                <WeeklyReports />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/teamlead/reports/:reportId"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={[
                  "teamlead"
                ]}
              >

                <ReviewReport />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        {/* =========================
            HR
        ========================== */}

        <Route
          path="/hr"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["hr"]}
              >

                <HRDashboard />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/hr/performance"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["hr"]}
              >

                <EmployeePerformance />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/hr/appraisal"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["hr"]}
              >

                <AIAppraisal />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        <Route
          path="/hr/recommendations"
          element={
            <ProtectedLayout>

              <RoleRoute
                allowedRoles={["hr"]}
              >

                <Recommendations />

              </RoleRoute>

            </ProtectedLayout>
          }
        />


        {/* 404 */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}
