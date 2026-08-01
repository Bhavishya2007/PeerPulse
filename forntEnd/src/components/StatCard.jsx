export default function StatCard({
  icon,
  label,
  value,
  description
}) {

  return (

    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-label">
        {label}
      </div>

      {description && (

        <div
          style={{
            fontSize: "12px",
            color: "#9ca3af",
            marginTop: "6px"
          }}
        >
          {description}
        </div>

      )}

    </div>

  );
}