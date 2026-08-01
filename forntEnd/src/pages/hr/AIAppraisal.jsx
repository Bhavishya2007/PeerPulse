import {
  useEffect,
  useState
} from "react";

import {
  Brain,
  Sparkles,
  Award,
  GraduationCap
} from "lucide-react";

import {
  getEmployees
} from "../../services/employeeApi";

import {
  generateAppraisal
} from "../../services/aiApi";

import BadgeCard
  from "../../components/BadgeCard";


export default function AIAppraisal() {

  const [employees, setEmployees] =
    useState([]);

  const [employeeId, setEmployeeId] =
    useState("");

  const [month, setMonth] =
    useState(
      new Date()
        .toISOString()
        .slice(0, 7)
    );

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  useEffect(() => {

    getEmployees()
      .then(setEmployees)
      .catch(() => {});

  }, []);


  async function analyze() {

    if (!employeeId) {

      setError(
        "Select an employee first."
      );

      return;

    }


    setError("");

    setResult(null);

    setLoading(true);


    try {

      const data =
        await generateAppraisal(
          employeeId,
          month,
          true
        );


      setResult(data);

    }

    catch (err) {

      setError(
        err.response?.data?.detail ||
        "AI analysis failed."
      );

    }

    finally {

      setLoading(false);

    }

  }


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            AI Performance Appraisal
          </div>

          <div className="page-subtitle">
            Generate an evidence-based monthly appraisal using Llama 3.
          </div>

        </div>

      </div>


      <div className="ai-panel">

        <div className="ai-title">

          <Brain size={21} />

          Llama 3 Analysis Engine

        </div>


        <p
          style={{
            marginTop: "10px",
            color: "#4b5563",
            lineHeight: 1.6
          }}
        >
          The AI analyzes daily work updates,
          peer recognition and approved Team Lead
          reports to identify competencies, evidence,
          skill gaps and development recommendations.
        </p>


        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr auto",
            gap: "15px",
            marginTop: "20px"
          }}
        >

          <div>

            <label className="form-label">
              Employee
            </label>

            <select
              className="form-select"
              value={employeeId}
              onChange={(e) =>
                setEmployeeId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select employee
              </option>

              {employees.map(
                employee => (

                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.name}
                  </option>

                )
              )}

            </select>

          </div>


          <div>

            <label className="form-label">
              Review Month
            </label>

            <input
              className="form-input"
              type="month"
              value={month}
              onChange={(e) =>
                setMonth(
                  e.target.value
                )
              }
            />

          </div>


          <div
            style={{
              display: "flex",
              alignItems: "end"
            }}
          >

            <button
              className="btn btn-primary"
              onClick={analyze}
              disabled={loading}
            >

              <Sparkles size={17} />

              {loading
                ? "Analyzing..."
                : "Analyze"}

            </button>

          </div>

        </div>

      </div>


      {error && (

        <div
          className="alert alert-error"
          style={{
            marginTop: "20px"
          }}
        >
          {error}
        </div>

      )}


      {result && (

        <div
          style={{
            marginTop: "25px"
          }}
        >

          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon">
                <Brain size={20} />
              </div>

              <div className="stat-value">
                {result.performance_score}
              </div>

              <div className="stat-label">
                Performance Score
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <Award size={20} />
              </div>

              <div className="stat-value">
                {result.recognition_score}
              </div>

              <div className="stat-label">
                Recognition Score
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <Award size={20} />
              </div>

              <div className="stat-value">
                {result.badges?.length || 0}
              </div>

              <div className="stat-label">
                AI Badges
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <GraduationCap size={20} />
              </div>

              <div className="stat-value">
                {result.skill_gaps?.length || 0}
              </div>

              <div className="stat-label">
                Skill Gaps
              </div>

            </div>

          </div>


          <div className="dashboard-grid">

            <div className="card">

              <div className="card-title">
                Competency Analysis
              </div>

              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.7
                }}
              >
                {result.competency_summary}
              </p>


              <div
                className="card-title"
                style={{
                  marginTop: "25px"
                }}
              >
                Evidence Summary
              </div>

              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.7
                }}
              >
                {result.evidence_summary}
              </p>


              <div
                className="card-title"
                style={{
                  marginTop: "25px"
                }}
              >
                HR Recommendation
              </div>

              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.7
                }}
              >
                {result.recommendation}
              </p>

            </div>


            <div>

              <div className="card">

                <div className="card-title">
                  AI Achievement Badges
                </div>


                {result.badges?.length === 0 ? (

                  <div className="empty-state">
                    No badges assigned based on current evidence.
                  </div>

                ) : (

                  result.badges.map(
                    badge => (

                      <div
                        key={badge}
                        style={{
                          marginBottom: "10px"
                        }}
                      >

                        <BadgeCard
                          badge={badge}
                        />

                      </div>

                    )
                  )

                )}

              </div>


              <div
                className="card"
                style={{
                  marginTop: "20px"
                }}
              >

                <div className="card-title">
                  Skill Gaps
                </div>


                {result.skill_gaps?.length === 0 ? (

                  <div className="empty-state">
                    No major skill gaps identified.
                  </div>

                ) : (

                  result.skill_gaps.map(
                    gap => (

                      <div
                        key={gap}
                        style={{
                          padding: "10px 0",
                          borderBottom:
                            "1px solid #eee"
                        }}
                      >
                        {gap}
                      </div>

                    )
                  )

                )}

              </div>

            </div>

          </div>


          <div
            className="card"
            style={{
              marginTop: "20px"
            }}
          >

            <div className="card-title">

              <GraduationCap
                size={18}
                style={{
                  verticalAlign: "middle"
                }}
              />

              {" "}Training Recommendations

            </div>


            {result.training_recommendations?.length === 0 ? (

              <div className="empty-state">
                No training recommendations.
              </div>

            ) : (

              <div className="dashboard-grid-three">

                {result.training_recommendations.map(
                  training => (

                    <div
                      className="card"
                      key={training}
                    >

                      <GraduationCap
                        size={22}
                        color="#6366f1"
                      />

                      <div
                        style={{
                          marginTop: "10px",
                          fontWeight: 650
                        }}
                      >
                        {training}
                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      )}

    </>

  );

}