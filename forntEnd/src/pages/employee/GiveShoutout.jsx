import {
  useEffect,
  useState
} from "react";

import {
  HeartHandshake
} from "lucide-react";

import {
  createShoutout,
  getEmployees,
  getShoutoutQuota
} from "../../services/employeeApi";

import {
  COMPETENCIES
} from "../../utils/constants";


export default function GiveShoutout() {

  const [employees, setEmployees] =
    useState([]);

  const [quota, setQuota] =
    useState(null);

  const [receiverId, setReceiverId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [competency, setCompetency] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [saving, setSaving] =
    useState(false);


  useEffect(() => {

    async function load() {

      const [
        employeeData,
        quotaData
      ] = await Promise.all([

        getEmployees(),

        getShoutoutQuota()

      ]);


      setEmployees(
        employeeData
      );

      setQuota(
        quotaData
      );

    }


    load();

  }, []);


  async function submit(e) {

    e.preventDefault();

    setError("");

    setSuccess("");

    setSaving(true);


    try {

      await createShoutout({

        receiver_id:
          Number(receiverId),

        message,

        competency:
          competency || null

      });


      setSuccess(
        "Shoutout sent successfully!"
      );


      setReceiverId("");

      setMessage("");

      setCompetency("");


      const updated =
        await getShoutoutQuota();

      setQuota(updated);

    }

    catch (err) {

      setError(
        err.response?.data?.detail ||
        "Could not send shoutout."
      );

    }

    finally {

      setSaving(false);

    }

  }


  const disabled =
    quota &&
    quota.remaining <= 0;


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            Give a Shoutout
          </div>

          <div className="page-subtitle">
            Recognize a teammate's real contribution.
          </div>

        </div>


        <div className="badge badge-purple">

          {quota?.remaining ?? 16}
          {" "}of 16 remaining

        </div>

      </div>


      <div
        className="card"
        style={{
          maxWidth: "850px"
        }}
      >

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}


        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}


        {disabled && (

          <div className="alert alert-error">
            You have reached your 16-shoutout review-cycle limit.
          </div>

        )}


        <form onSubmit={submit}>

          <div className="form-group">

            <label className="form-label">
              Recognize teammate
            </label>

            <select
              className="form-select"
              value={receiverId}
              onChange={(e) =>
                setReceiverId(
                  e.target.value
                )
              }
              required
              disabled={disabled}
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
                    {employee.job_title
                      ? ` — ${employee.job_title}`
                      : ""}
                  </option>

                )
              )}

            </select>

          </div>


          <div className="form-group">

            <label className="form-label">
              Competency
            </label>

            <select
              className="form-select"
              value={competency}
              onChange={(e) =>
                setCompetency(
                  e.target.value
                )
              }
              disabled={disabled}
            >

              <option value="">
                Select competency
              </option>

              {COMPETENCIES.map(
                item => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                )
              )}

            </select>

          </div>


          <div className="form-group">

            <label className="form-label">
              Why are you recognizing them?
            </label>

            <textarea
              className="form-textarea"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Mention the specific contribution or impact..."
              required
              disabled={disabled}
            />

          </div>


          <button
            className="btn btn-primary"
            disabled={
              saving ||
              disabled
            }
          >

            <HeartHandshake
              size={18}
            />

            {saving
              ? "Sending..."
              : "Send Shoutout"}

          </button>

        </form>

      </div>

    </>

  );

}