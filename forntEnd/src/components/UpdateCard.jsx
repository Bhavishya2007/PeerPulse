export default function UpdateCard({
  update
}) {

  return (

    <div className="update-card">

      <div className="update-date">
        {update.work_date}
      </div>

      <div className="update-title">
        Achievement
      </div>

      <div className="update-text">
        {update.achievement}
      </div>


      {update.assistance && (

        <div
          style={{
            marginTop: "10px"
          }}
        >

          <strong>
            Peer Assistance:
          </strong>

          <div className="update-text">
            {update.assistance}
          </div>

        </div>

      )}


      {update.blockers && (

        <div
          style={{
            marginTop: "10px"
          }}
        >

          <strong>
            Blockers:
          </strong>

          <div className="update-text">
            {update.blockers}
          </div>

        </div>

      )}

    </div>

  );
}