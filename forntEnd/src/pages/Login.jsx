import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  HeartHandshake,
  LogIn
} from "lucide-react";

import {
  useAuth
} from "../context/AuthContext";


export default function Login() {

  const navigate = useNavigate();

  const {
    login,
    loading
  } = useAuth();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  async function handleSubmit(
    e
  ) {

    e.preventDefault();

    setError("");


    try {

      const data =
        await login(
          email,
          password
        );


      if (
        data.user.role ===
        "employee"
      ) {

        navigate("/employee");

      }

      else if (
        data.user.role ===
        "teamlead"
      ) {

        navigate("/teamlead");

      }

      else if (
        data.user.role ===
        "hr"
      ) {

        navigate("/hr");

      }

    }

    catch (err) {

      setError(
        err.response?.data?.detail ||
        "Login failed. Check your credentials."
      );

    }

  }


  return (

    <div className="login-page">

      <div className="login-container">

        <div className="login-brand">

          <div className="login-brand-icon">

            <HeartHandshake size={28} />

          </div>

          <div className="login-title">
            PeerPulse
          </div>

          <div className="login-subtitle">
            AI-powered performance alignment
          </div>

        </div>


        <div className="login-card">

          <h2
            style={{
              marginBottom: "7px"
            }}
          >
            Welcome back
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "24px"
            }}
          >
            Sign in to your PeerPulse account
          </p>


          {error && (

            <div className="alert alert-error">
              {error}
            </div>

          )}


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label className="form-label">
                Email
              </label>

              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@company.com"
                required
              />

            </div>


            <div className="form-group">

              <label className="form-label">
                Password
              </label>

              <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
              />

            </div>


            <button
              className="btn btn-primary"
              style={{
                width: "100%"
              }}
              disabled={loading}
            >

              <LogIn size={18} />

              {loading
                ? "Signing in..."
                : "Sign In"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );
}