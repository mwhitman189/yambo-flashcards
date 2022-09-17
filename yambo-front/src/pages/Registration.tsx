import React, { useState } from "react";
import { Link } from "react-router-dom";

import FormUser from "../components/FormUser";
import FormField from "../components/FormField";

const Registration = ({ url }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const FormContents = () => {
    return (
      <>
        <FormField
          labelText="Email"
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          tabIndex={2}
          autoFocus={true}>
        </FormField>
        <FormField
          labelText="Password"
          autoComplete="on"
          type="password"
          id="password"
          name="name"
          placeholder="Enter password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          tabIndex={3}></FormField>
        <FormField
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          tabIndex={4}></FormField>
      </>
    );
  };

  return (
    <>
      <FormUser
        formTitle="Registration"
        buttonText="Submit"
        url={url}
        email={email}
        password={password}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        confirmPassword={confirmPassword}
        subtextMessage={
          <div>
            Already have an account? <Link to="/login" tabIndex={6}>Login</Link>
          </div>
        }
        formContents={FormContents()}></FormUser>

    </>
  );
};

export default Registration;
