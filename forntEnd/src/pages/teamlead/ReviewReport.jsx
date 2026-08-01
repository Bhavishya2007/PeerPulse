import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getWeeklyReports,
  approveWeeklyReport
} from "../../services/teamleadApi";


export default function ReviewReport() {

  const { reportId } =
    useParams();

  const navigate =
    useNavigate();


  const [report, setReport] =
    useState(null);

  const [feedback, setFeedback] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");


  useEffect(() => {

    async function load() {

      try {

        const reports =
          await getWeeklyReports();


        const found =
          reports.find(
            item =>
              item.id ===
              Number(reportId)
          );


        setReport(found);

      }

      finally {

        setLoading(false);

      }

    }


    load();

  }, [reportId]);


  async function approve() {

    setSaving(true);

    setError("");


    try {

      await approveWeeklyReport(

        report.id,

        {
          approved: true,

          tl_feedback:
            feedback

        }

      );


      navigate(
        "/teamlead/reports"
      );

    }

    catch (err) {

      setError(
        err.response?.data?.detail ||
        "Could not approve report."
      );

    }

    finally {

      setSaving(false);

    }

  }


  if (loading) {

    return (
      <div className="loading">
        Loading report...
      </div>
    );

  }


  if (!report) {

    return (

      <div className="card">

        <div className="empty-state">
          Report not found.
        </div>

      </div>

    );

  }


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            Review Weekly Report
          </div>

          <div className="page-subtitle">
            Employee #{report.employee_id}
          </div>

        </div>

      </div>


      {error && (

        <div className="alert alert-error">
          {error}
        </div>

      )}


      <div className="card">

        <div className="card-title">
          Reporting Period
        </div>

        <p>
          {report.week_start}
          {" → "}
          {report.week_end}
        </p>


        <hr
          style={{
            margin: "20px 0",
            border: "none",
            borderTop:
              "1px solid #e5e7eb"
          }}
        />


        <div className="card-title">
          Weekly Summary
        </div>

        <p
          style={{
            lineHeight: 1.7,
            color: "#4b5563"
          }}
        >
          {report.summary}
        </p>


        {report.shoutout_summary && (

          <>

            <div
              className="card-title"
              style={{
                marginTop: "25px"
              }}
            >
              Recognition Summary
            </div>

            <p
              style={{
                lineHeight: 1.7,
                color: "#4b5563"
              }}
            >
              {report.shoutout_summary}
            </p>

          </>

        )}


        <div
          className="form-group"
          style={{
            marginTop: "25px"
          }}
        >

          <label className="form-label">
            Team Lead Feedback
          </label>

          <textarea
            className="form-textarea"
            value={feedback}
            onChange={(e) =>
              setFeedback(
                e.target.value
              )
            }
            placeholder="Add validation notes or feedback..."
          />

        </div>


        <button
          className="btn btn-success"
          onClick={approve}
          disabled={
            saving ||
            report.approved
          }
        >

          {report.approved
            ? "Already Approved"
            : saving
              ? "Approving..."
              : "Approve & Sign Off"}

        </button>

      </div>

    </>

  );

}