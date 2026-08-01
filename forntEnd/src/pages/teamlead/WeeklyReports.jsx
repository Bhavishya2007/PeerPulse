import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import Loading
  from "../../components/Loading";

import {
  getWeeklyReports
} from "../../services/teamleadApi";


export default function WeeklyReports() {

  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    getWeeklyReports()

      .then(setReports)

      .finally(() =>
        setLoading(false)
      );

  }, []);


  if (loading) {

    return <Loading />;

  }


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            Weekly Reports
          </div>

          <div className="page-subtitle">
            Review and approve team performance summaries.
          </div>

        </div>

      </div>


      <div className="card">

        <div className="table-wrapper">

          <table className="data-table">

            <thead>

              <tr>

                <th>
                  Employee
                </th>

                <th>
                  Week
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {reports.map(
                report => (

                  <tr key={report.id}>

                    <td>
                      Employee #{report.employee_id}
                    </td>

                    <td>
                      {report.week_start}
                      {" → "}
                      {report.week_end}
                    </td>

                    <td>

                      {report.approved ? (

                        <span className="badge badge-green">
                          Approved
                        </span>

                      ) : (

                        <span className="badge badge-yellow">
                          Pending
                        </span>

                      )}

                    </td>

                    <td>

                      <Link
                        to={`/teamlead/reports/${report.id}`}
                        className="btn btn-secondary"
                      >
                        Review
                      </Link>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>


          {reports.length === 0 && (

            <div className="empty-state">
              No weekly reports available.
            </div>

          )}

        </div>

      </div>

    </>

  );

}