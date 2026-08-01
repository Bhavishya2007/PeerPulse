import {
  useState
} from "react";

import {
  CheckCircle
} from "lucide-react";

import {
  createDailyUpdate
} from "../../services/employeeApi";


export default function DailyUpdate() {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const [form, setForm] =
    useState({

      work_date: today,

      achievement: "",

      blockers: "",

      assistance: ""

    });


  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);


  function updateField(
    field,
    value
  ) {

    setForm({
      ...form,
      [field]: value
    });

  }


  async function submit(e) {

    e.preventDefault();

    setMessage("");

    setError("");

    setSaving(true);


    try {

      await createDailyUpdate(
        form
      );


      setMessage(
        "Your daily update has been saved successfully."
      );


      setForm({

        ...form,

        achievement: "",

        blockers: "",

        assistance: ""

      });

    }

    catch (err) {

      setError(
        err.response?.data?.detail ||
        "Could not save update."
      );

    }

    finally {

      setSaving(false);

    }

  }


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            Daily Work Update
          </div>

          <div className="page-subtitle">
            Capture meaningful contributions and support.
          </div>

        </div>

      </div>


      <div
        className="card"
        style={{
          maxWidth: "850px"
        }}
      >

        {message && (

          <div className="alert alert-success">
            <CheckCircle
              size={16}
              style={{
                verticalAlign: "middle"
              }}
            />

            {" "}{message}
          </div>

        )}


        {error && (

          <div className="alert alert-error">
            {error}
          </div>

        )}


        <form onSubmit={submit}>

          <div className="form-group">

            <label className="form-label">
              Date
            </label>

            <input
              className="form-input"
              type="date"
              value={form.work_date}
              onChange={(e) =>
                updateField(
                  "work_date",
                  e.target.value
                )
              }
              required
            />

          </div>


          <div className="form-group">

            <label className="form-label">
              What did you accomplish today?
            </label>

            <textarea
              className="form-textarea"
              value={form.achievement}
              onChange={(e) =>
                updateField(
                  "achievement",
                  e.target.value
                )
              }
              placeholder="Describe your meaningful work, outcome, or contribution..."
              required
            />

          </div>


          <div className="form-group">

            <label className="form-label">
              Did you help another teammate?
            </label>

            <textarea
              className="form-textarea"
              value={form.assistance}
              onChange={(e) =>
                updateField(
                  "assistance",
                  e.target.value
                )
              }
              placeholder="Describe peer support, mentoring, debugging, collaboration, etc."
            />

          </div>


          <div className="form-group">

            <label className="form-label">
              Any blockers?
            </label>

            <textarea
              className="form-textarea"
              value={form.blockers}
              onChange={(e) =>
                updateField(
                  "blockers",
                  e.target.value
                )
              }
              placeholder="Mention blockers or challenges, if any..."
            />

          </div>


          <button
            className="btn btn-primary"
            disabled={saving}
          >

            {saving
              ? "Saving..."
              : "Save Daily Update"}

          </button>

        </form>

      </div>

    </>

  );

}