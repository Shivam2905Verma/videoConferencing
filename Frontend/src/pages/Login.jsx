import React, { useContext, useEffect, useState } from "react";
import "../signup.css";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginHandler, router } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseFromHandler, setResponse] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    const response = await loginHandler(username, password);
    console.log("Response from login handler:", response);
    if (
      response.status == 500 ||
      response.status == 400 ||
      response.status == 404 ||
      response.status == 401
    ) {
      setError(true);
      setResponse(response.response.data.message);
    } else {
      setError(false);
      setResponse(response.data.message);
      setUsername("");
      setPassword("");
      router("/home");
    }
  };

  const route = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      route("/home");
    }
  });
  return (
    <div>
      <>
        <div className="signupContainer">
          <div className="signupBox">
            <p>Login</p>
            <div className="signupInput">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Password"
              />
              {responseFromHandler != "" ? (
                error ? (
                  <p style={{ color: "red" }}>{responseFromHandler}</p>
                ) : (
                  <p style={{ color: "green" }}>{responseFromHandler}</p>
                )
              ) : (
                <></>
              )}
              <p className="registerbtn" onClick={handleLogin}>
                Login
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
