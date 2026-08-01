import {
  useEffect,
  useState
} from "react";

import {
  Users,
  Brain,
  GraduationCap,
  TrendingUp
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import StatCard
  from "../../components/StatCard";

import Loading
  from "../../components/Loading";

import {
  getHRDashboard,
  getAppraisals
} from "../../services/aiApi";


export default function HRDashboard() {

  const [dashboard, setDashboard] =
    useState(null);

  const [appraisals, setAppraisals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function load() {

      try {

        const [
          dashboardData,
          appraisalData
        ] = await Promise.all([

          getHRDashboard(),

          getAppraisals()

        ]);


        setDashboard(
          dashboardData
        );

        setAppraisals(
          appraisalData
        );

      }

      finally {

        setLoading(false);

      }

    }


    load();

  }, []);


  if (loading) {

    return <Loading />;

  }


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            HR Performance Center
          </div>

          <div className="page-subtitle">
            AI-assisted performance alignment and development.
          </div>

        </div>


        <Link
          to="/hr/appraisal"
          className="btn btn-primary"
        >
          <Brain size={17} />
          Generate AI Appraisal
        </Link>

      </div>


      <div className="stats-grid">

        <StatCard
          icon={<Users size={20} />}
          value={
            dashboard?.employees || 0
          }
          label="Employees"
        />

        <StatCard
          icon={<TrendingUp size={20} />}
          value={
            dashboard?.appraisals || 0
          }
          label="AI Appraisals"
        />

        <StatCard
          icon={<GraduationCap size={20} />}
          value={
            dashboard?.training_recommendations ||
            0
          }
          label="Training Recommendations"
        />

        <StatCard
          icon={<Brain size={20} />}
          value={appraisals.length}
          label="Analyzed Employees"
        />

      </div>


      <div className="dashboard-grid">

        <div className="card">

          <div className="card-title">
            Latest AI Appraisals
          </div>


          {appraisals.length === 0 ? (

            <div className="empty-state">
              No AI appraisals generated yet.
            </div>

          ) : (

            appraisals
              .slice(0, 8)
              .map(item => (

                <div
                  className="update-card"
                  key={item.id}
                >

                  <div className="update-date">
                    {item.month}
                  </div>

                  <div className="update-title">
                    Employee #{item.employee_id}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "8px"
                    }}
                  >

                    <span className="badge badge-purple">
                      Performance:
                      {" "}
                      {item.performance_score}
                    </span>

                    <span className="badge badge-green">
                      Recognition:
                      {" "}
                      {item.recognition_score}
                    </span>

                  </div>

                </div>

              ))

          )}

        </div>


        <div className="ai-panel">

          <div className="ai-title">

            <Brain size={21} />

            Llama 3 Performance Engine

          </div>


          <p
            style={{
              marginTop: "12px",
              lineHeight: 1.6,
              color: "#4b5563"
            }}
          >
            PeerPulse analyzes TL-approved reports,
            daily contributions and peer recognition
            to create evidence-based performance insights.
          </p>


          <Link
            to="/hr/appraisal"
            className="btn btn-primary"
            style={{
              marginTop: "20px"
            }}
          >
            Open AI Analysis
          </Link>

        </div>

      </div>

    </>

  );

}