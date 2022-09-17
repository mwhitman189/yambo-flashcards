import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useCallServer(url, email, password, nav = "/") {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {


    async function callServer() {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify({
            email,
            password
          })
        });

        if (!response.ok) {

          let errorMessage;

          if (response.status === 400) {

            errorMessage = "Either your email or password is inccorect. Please try again.";

            const focusElement = document.querySelector("#email");
            focusElement.focus();
          } else {

            errorMessage = "Something went wrong trying to connect to the server. Please check your connection and try again.";
          }
          throw new Error(errorMessage);

        }

        const data = await response.json();
        window.localStorage.setItem('token', data.token);
        setLoader(false);
        navigate(nav);
        setError("You did it!");

      } catch (err) {
        console.error(err.message);
        setLoader(false);
        setError(err.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }

    if (url) {
      setLoader(true);
      callServer();
    }
  }, [url]);
  return [error, loader];
}
