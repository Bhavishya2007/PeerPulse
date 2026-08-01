import { Award } from "lucide-react";


export default function ShoutoutCard({
  shoutout,
  senderName = "Team Member"
}) {

  const initials = senderName
    .split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


  return (

    <div className="shoutout-card">

      <div className="shoutout-avatar">
        {initials}
      </div>


      <div style={{ flex: 1 }}>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >

          <strong>
            {senderName}
          </strong>

          <Award
            size={17}
            style={{
              color: "#6366f1"
            }}
          />

        </div>


        <div className="shoutout-message">
          {shoutout.message}
        </div>


        {shoutout.competency && (

          <div
            style={{
              marginTop: "8px"
            }}
          >

            <span className="badge badge-purple">
              {shoutout.competency}
            </span>

          </div>

        )}

      </div>

    </div>

  );
}