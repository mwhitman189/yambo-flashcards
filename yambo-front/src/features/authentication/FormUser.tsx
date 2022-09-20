import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";

import Button from "../../components/buttons/Button";
import Subtext from "../Subtext";
import ErrorModal from "../modals/error/ErrorModal";
import useCallServer from "../../hooks/API/useCallServer";
import {
  ErrorText,
  FormTitle,
  FormWrapper,
  UserForm
} from "../../components/forms/generalFormComponents";

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
  setConfirmPassword
}: any) => {
  const [query, setQuery] = useState("");
  const [serverError, loader]: any = useCallServer(query, email, password, "/");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const resetForm = (err: any) => {
      setPassword("");
      setConfirmPassword && setConfirmPassword("");
      setTimeout(() => {
        setValidationError("");
      }, 5000);
      const passwordInput = document.querySelector("#password") as HTMLInputElement;
      passwordInput.focus();
      return setValidationError(err);
    };

    if (confirmPassword && password !== confirmPassword) {
      resetForm("Passwords don't match");
    }

    const validated = true;

    switch (!validated) {
      case /\S+@\S+\.\S+/.test(email):
        resetForm("Not a valid email");
        break;

      case /[0-9]/.test(password):
        console.log(/[0-9]/.test(password));
        resetForm("Password needs at least one number");
        break;

      case /[A-Z]/.test(password):
        resetForm("Password needs at least one uppercase letter");
        break;

      case /[a-z]/.test(password):
        resetForm("Password needs at least one lowercase letter");
        break;

      case /[!@#$%^&* ()_ +\-={ }; ':"\\|,.<>?]/.test(password):
        resetForm("Password needs at least one special character");
        break;

      case password.length > 7:
        resetForm("Password must be at least 8 characters long");
        break;

      default:
        setQuery(url);
        setTimeout(() => {
          setQuery("");
        }, 1000);
    }
  };

  const handleFocus = (location: string) => {
    const span = (document.querySelector(`#${location}`) as HTMLSpanElement) || null;
    span.focus();
  };

  return (
    <FormWrapper>
      {loader && (
        <div>
          <div className="loader">
            <TailSpin color={"#e0bde6"} ariaLabel="loading-indicator" />
          </div>
        </div>
      )}

      <UserForm onSubmit={handleSubmit}>
        <span
          id="formWrapperStart"
          tabIndex={1}
          onFocus={() => handleFocus("confirmPassword")}></span>
        <FormTitle>{formTitle}</FormTitle>
        {serverError ? (
          <ErrorModal data-testid="error-message" error={serverError}></ErrorModal>
        ) : validationError ? (
          <ErrorText data-testid="error-message">{validationError}</ErrorText>
        ) : (
          <></>
        )}
        {formContents && formContents}
        <Button text={buttonText} type="submit" tabIndex={5}></Button>
        <Subtext subtextMessage={subtextMessage}></Subtext>
        <span id="formWrapperEnd" onFocus={() => handleFocus("email")} tabIndex={7}></span>
      </UserForm>
    </FormWrapper>
  );
};

export default FormUser;
