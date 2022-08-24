import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

import Button from "./Button";
import Subtext from "./Subtext";

import useCallServer from "../hooks/useCallServer";

const FormWrapper = styled.div`
   {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Form = styled.form`
   {
    width: 380px;
    padding: 1.5rem;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    background: #fff;
  }
`;

const FormTitle = styled.h3`
   {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const FormUser = ({
  formTitle,
  formContents,
  buttonText = "Submit",
  subtextMessage,
  url,
  email,
  setPassword,
  password,
  confirmPassword,
  setConfirmPassword,
  checkPassword
}: any) => {
  const [query, setQuery] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  let [error, loader]: any = useCallServer(query, email, password, "/");

  return (
    <FormWrapper>
      {loader && (
        <div>
          <div className="loader">
            <TailSpin color={"#e0bde6"} ariaLabel="loading-indicator" />
          </div>
        </div>
      )}

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (checkPassword && password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            loader = false;
            setTimeout(() => {
              error = "";
            }, 5000);
            return (error = "Passwords do not match.");
          }
          setQuery(url);
        }}>
        <FormTitle>{formTitle}</FormTitle>
        {error && <span className="error-message">{error}</span>}
        {formContents && formContents}
        <Button text={buttonText} type="submit"></Button>
        <Subtext subtextMessage={subtextMessage}></Subtext>
      </Form>
    </FormWrapper>
  );
};

export default FormUser;
