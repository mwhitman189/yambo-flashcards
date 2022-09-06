import React, { useState } from "react";
import { Link } from "react-router-dom";

// import styled from "styled-components";

import FormUser from "../components/FormUser";
import FormField from "../components/FormField";
import FormLabel from "../components/FormLabel";
import FormInput from "../components/FormInput";
import Subtext from "../components/Subtext";

// const LoginScreenForgotPassword = styled.div`
//    {
//     font-size: 0.7rem;
//   }
// `;

const Login = () => {
  // const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = `http://localhost:8888/user/login`;

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
        <FormLabel htmlFor="password" labelText="Password"></FormLabel>
        <Link to="/forgotpassword" tabIndex={4}>
          <Subtext subtextMessage="Forgot Password?"></Subtext>
        </Link>
        <FormInput
          labelText="Password"
          autoComplete="on"
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          tabIndex={1}></FormInput>
        {/* <Button type="submit" tabIndex={3} text="Login"></Button> */}
      </>
    );
  };

  return (
    <FormUser
      formTitle="Login"
      buttonText="Login"
      url={url}
      email={email}
      password={password}
      subtextMessage={
        <div>
          Don&apos;t have an account?<Link to="/registration"> Register</Link>
        </div>
      }
      formContents={FormContents()}></FormUser>
  );
};

export default Login;