import {
  Award,
  Sparkles
} from "lucide-react";


export default function BadgeCard({
  badge
}) {

  return (

    <div className="card">

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}
      >

        <div className="stat-icon">
          <Award size={21} />
        </div>

        <div>

          <div
            style={{
              fontWeight: 700
            }}
          >
            {badge}
          </div>

          <div
            style={{
              color: "#6b7280",
              fontSize: "13px",
              marginTop: "4px"
            }}
          >
            AI-recognized achievement
          </div>

        </div>

        <Sparkles
          size={17}
          style={{
            marginLeft: "auto",
            color: "#6366f1"
          }}
        />

      </div>

    </div>

  );
}