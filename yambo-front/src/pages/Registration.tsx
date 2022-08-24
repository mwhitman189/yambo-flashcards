import React, { useState } from "react";
import { Link } from "react-router-dom";

import FormUser from "../components/FormUser";
import FormField from "../components/FormField";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkPassword = true;
  const url = `http://localhost:8888/user/signup`;
  // const [error, setError] = useState<string>("");
  // const [loader, setLoader] = useState<boolean>(false);

  // const navigate = useNavigate();

  // const registerHandler = async (e: any) => {
  //   e.preventDefault();
  //   setLoader(true);

  //   if (password !== confirmPassword) {
  //     setPassword("");
  //     setConfirmPassword("");
  //     setLoader(false);
  //     setTimeout(() => {
  //       setError("");
  //     }, 5000);

  //     return setError("Passwords do not match.");
  //   }

  //   try {
  //     const response = await fetch("http://localhost:8888/user/signup", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json;charset=UTF-8"
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password
  //       })
  //     });

  //     if (!response.ok) throw new Error();

  //     navigate("/");
  //     setLoader(false);
  //   } catch (err: any) {
  //     console.error(err);
  //     setError(err.message);
  //     setTimeout(() => {
  //       setLoader(false);
  //       setError("");
  //     }, 5000);
  //   }
  // };

  const FormContents = () => {
    return (
      <>
        <FormField
          labelText="Email"
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          tabIndex={1}></FormField>
        <FormField
          labelText="Password"
          autoComplete="on"
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          tabIndex={1}></FormField>
        <FormField
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}></FormField>
      </>
    );
  };

  return (
    <FormUser
      formTitle="Registration"
      buttonText="Submit"
      url={url}
      email={email}
      password={password}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      confirmPassword={confirmPassword}
      checkPassword={checkPassword}
      subtextMessage={
        <div>
          Already have an account?<Link to="/login">Login</Link>
        </div>
      }
      formContents={FormContents()}></FormUser>

    // <div className="register-screen">
    //   {loader && (
    //     <div>
    //       <div className="loader">
    //         <TailSpin color={"#e0bde6"} ariaLabel="loading-indicator" />
    //       </div>
    //     </div>
    //   )}
    //   <form onSubmit={registerHandler} className="register-screen__form">
    //     <h3 className="register-screen__title">Register</h3>
    //     {error && <span className="error-message">{error}</span>}
    //     <div className="form-group">
    //       <label className="form-label-sm" htmlFor="email">
    //         Email:
    //       </label>
    //       <input
    //         autoComplete="on"
    //         className="auth-input"
    //         type="email"
    //         required
    //         id="email"
    //         placeholder="Enter email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label className="form-label-sm" htmlFor="password">
    //         Password:
    //       </label>
    //       <input
    //         autoComplete="on"
    //         className="auth-input"
    //         type="password"
    //         required
    //         id="password"
    //         placeholder="Enter password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label className="form-label-sm" htmlFor="confirmPassword">
    //         Confirm Password:
    //       </label>
    //       <input
    //         className="auth-input"
    //         type="password"
    //         required
    //         id="confirmPassword"
    //         placeholder="Confirm password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //     </div>

    //     <button type="submit" className="btn btn-primary">
    //       Register
    //     </button>
    //     <span className="register-screen__subtext">
    //       Already have an account?<Link to="/login">Login</Link>
    //     </span>
    //   </form>
    // </div>
  );
};

export default Registration;
