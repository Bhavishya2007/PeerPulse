import {
  useEffect,
  useState
} from "react";

import {
  Users
} from "lucide-react";

import {
  getAppraisals
} from "../../services/aiApi";


export default function EmployeePerformance() {

  const [appraisals, setAppraisals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    getAppraisals()

      .then(setAppraisals)

      .finally(() =>
        setLoading(false)
      );

  }, []);


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            Employee Performance
          </div>

          <div className="page-subtitle">
            Evidence-based performance overview.
          </div>

        </div>

      </div>


      <div className="card">

        {loading ? (

          <div className="loading">
            Loading performance data...
          </div>

        ) : (

          <div className="table-wrapper">

            <table className="data-table">

              <thead>

                <tr>

                  <th>
                    Employee
                  </th>

                  <th>
                    Month
                  </th>

                  <th>
                    Performance
                  </th>

                  <th>
                    Recognition
                  </th>

                  <th>
                    Recommendation
                  </th>

                </tr>

              </thead>


              <tbody>

                {appraisals.map(
                  item => (

                    <tr key={item.id}>

                      <td>
                        <Users
                          size={15}
                          style={{
                            verticalAlign:
                              "middle"
                          }}
                        />
                        {" "}
                        Employee #
                        {item.employee_id}
                      </td>

                      <td>
                        {item.month}
                      </td>

                      <td>

                        <span className="badge badge-purple">
                          {item.performance_score}
                        </span>

                      </td>

                      <td>

                        <span className="badge badge-green">
                          {item.recognition_score}
                        </span>

                      </td>

                      <td>
                        {item.recommendation}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>


            {appraisals.length === 0 && (

              <div className="empty-state">
                No performance records available.
              </div>

            )}

          </div>

        )}

      </div>

    </>

  );

}