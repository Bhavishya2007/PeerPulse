import {
  GraduationCap,
  Sparkles
} from "lucide-react";


export default function MyDevelopment() {

  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            My Development
          </div>

          <div className="page-subtitle">
            Your AI-guided growth and upskilling pathway.
          </div>

        </div>

      </div>


      <div className="ai-panel">

        <div className="ai-title">

          <Sparkles size={20} />

          AI Development Pathway

        </div>


        <p
          style={{
            marginTop: "12px",
            lineHeight: 1.6,
            color: "#4b5563"
          }}
        >
          PeerPulse uses your approved performance evidence
          to identify skill gaps and recommend targeted
          development opportunities.
        </p>

      </div>


      <div
        className="dashboard-grid-three"
        style={{
          marginTop: "20px"
        }}
      >

        <div className="card">

          <GraduationCap
            size={24}
            color="#6366f1"
          />

          <h3
            style={{
              marginTop: "14px"
            }}
          >
            Skill Development
          </h3>

          <p
            style={{
              marginTop: "7px",
              color: "#6b7280"
            }}
          >
            AI identifies areas where additional
            training could help you grow.
          </p>

        </div>


        <div className="card">

          <Sparkles
            size={24}
            color="#6366f1"
          />

          <h3
            style={{
              marginTop: "14px"
            }}
          >
            Career Pathway
          </h3>

          <p
            style={{
              marginTop: "7px",
              color: "#6b7280"
            }}
          >
            Your contributions can be mapped
            to future career opportunities.
          </p>

        </div>


        <div className="card">

          <GraduationCap
            size={24}
            color="#6366f1"
          />

          <h3
            style={{
              marginTop: "14px"
            }}
          >
            Training
          </h3>

          <p
            style={{
              marginTop: "7px",
              color: "#6b7280"
            }}
          >
            Targeted internal learning recommendations
            can be assigned based on evidence.
          </p>

        </div>

      </div>

    </>

  );

}