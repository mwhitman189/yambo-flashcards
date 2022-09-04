import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useCallServer(url, email, password, nav = "/") {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function callServer() {
      setLoader(true);
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

        if (!response.ok) throw new Error();

        navigate(nav);
        setLoader(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setTimeout(() => {
          setLoader(false);
          setError("");
        }, 5000);
      }
    }

    if (url) callServer();
  }, [url]);

  return [error, loader];
}
