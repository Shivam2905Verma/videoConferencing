import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import "../signup.css";

function Signup() {
  const { signupHandler, router } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseFromHandler, setResponse] = useState("");
  const [error, setError] = useState(false);

  const handleSignup = async () => {
    const response = await signupHandler(name, username, password);
    console.log("Response from signup handler:", response);
    if (
      response.status == 500 ||
      response.status == 400 ||
      response.status == 302
    ) {
      setError(true);
      setResponse(response.response.data.message);
    } else {
      setError(false);
      setResponse(response.data.message);
      setName("");
      setUsername("");
      setPassword("");
      router("/login");
    }
  };

  const route = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      route("/home");
    }
  });

  return (
    <>
      <div className="signupContainer">
        <div className="signupBox">
          <p>Sign up</p>
          <div className="signupInput">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
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
            <p className="registerbtn" onClick={handleSignup}>
              Register
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
