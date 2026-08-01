import { Bell } from "lucide-react";

import { useAuth } from "../context/AuthContext";


export default function Navbar() {

  const { user } = useAuth();


  const initials = user?.name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


  return (

    <header className="navbar">

      <div>

        <div className="navbar-title">
          PeerPulse Recognition
        </div>

      </div>


      <div className="user-menu">

        <Bell size={19} />

        <div className="avatar">
          {initials}
        </div>

        <div>

          <div className="user-name">
            {user?.name}
          </div>

          <div className="user-role">
            {user?.role}
          </div>

        </div>

      </div>

    </header>

  );
}