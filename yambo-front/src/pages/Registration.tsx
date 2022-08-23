import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

import "./Registration.css";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const registerHandler = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setLoader(false);
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Passwords do not match.");
    }

    try {
      const response = await fetch("http://localhost:8888/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) throw new Error();

      navigate("/");
      setLoader(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setTimeout(() => {
        setLoader(false);
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      {loader && (
        <div>
          <div className="loader">
            <TailSpin color={"#e0bde6"} ariaLabel="loading-indicator" />
          </div>
        </div>
      )}
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label className="form-label-sm" htmlFor="email">
            Email:
          </label>
          <input
            autoComplete="on"
            className="auth-input"
            type="email"
            required
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label-sm" htmlFor="password">
            Password:
          </label>
          <input
            autoComplete="on"
            className="auth-input"
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label-sm" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className="auth-input"
            type="password"
            required
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <span className="register-screen__subtext">
          Already have an account?<Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Registration;
