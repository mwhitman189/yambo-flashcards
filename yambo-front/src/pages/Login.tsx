import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await fetch("/user/login", {
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

      navigate("/private");
      setLoader(false);
    } catch (error: any) {
      //The error above is the error thrown by a failed try...catch. The data below is error data
      setError(error.message);
      setLoader(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      {loader && (
        <div>
          <div className="loader">
            <TailSpin color={"#e0bde6"} ariaLabel="loading-indicator" />
          </div>
        </div>
      )}
      <form onSubmit={loginHandler} className="login-screen-form">
        <h3 className="login-screen-title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label className="form-label-sm" htmlFor="email">
            Email:
          </label>
          <input
            className="auth-input"
            type="email"
            required
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>
        {/* <div className="form-group">
          <label className="form-label-sm" htmlFor="password">
            Password:
            <Link to="/forgotpassword" className="login-screen-forgotpassword" tabIndex={4}>
              Forgot Password?
            </Link>
          </label>
          <input
            className="auth-input"
            autoComplete="on"
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={1}
          />
        </div> */}

        <button type="submit" className="btn btn-primary" tabIndex={3}>
          Login
        </button>
        <span className="login-screen-subtext">
          Don&apos;t have an account?<Link to="/registration"> Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
