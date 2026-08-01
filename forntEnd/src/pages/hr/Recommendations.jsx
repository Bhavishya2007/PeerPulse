import {
  useEffect,
  useState
} from "react";

import {
  GraduationCap
} from "lucide-react";

import {
  getTrainingRecommendations
} from "../../services/aiApi";


export default function Recommendations() {

  const [training, setTraining] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    getTrainingRecommendations()

      .then(setTraining)

      .finally(() =>
        setLoading(false)
      );

  }, []);


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            Development Recommendations
          </div>

          <div className="page-subtitle">
            AI-generated training pathways based on identified skill gaps.
          </div>

        </div>

      </div>


      <div className="card">

        {loading ? (

          <div className="loading">
            Loading recommendations...
          </div>

        ) : training.length === 0 ? (

          <div className="empty-state">
            No training recommendations available.
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
                    Skill Gap
                  </th>

                  <th>
                    Recommended Training
                  </th>

                  <th>
                    Reason
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {training.map(
                  item => (

                    <tr key={item.id}>

                      <td>
                        Employee #{item.employee_id}
                      </td>

                      <td>

                        <span className="badge badge-yellow">
                          {item.skill_gap}
                        </span>

                      </td>

                      <td>

                        <GraduationCap
                          size={15}
                          style={{
                            verticalAlign:
                              "middle"
                          }}
                        />

                        {" "}
                        {item.course_name}

                      </td>

                      <td>
                        {item.reason}
                      </td>

                      <td>

                        <span className="badge badge-purple">
                          {item.status}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>

  );

}