import { Link, useNavigate } from "react-router-dom";
import WithAuth from "../utils/WithAuth";
import { useState, useContext } from "react";
import "../App.css";
import image from "../assets/videocall.webp";
import { AuthContext } from "../Context/AuthContext";

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToHistory } = useContext(AuthContext);

  let handleJoinCall = async () => {
    await addToHistory(meetingCode);
    navigate(`/meeting/${meetingCode}`);
  };
  const [menuBarRight, setMenuBarRight] = useState(false);

  return (
    <div className="landingPageContainer">
      <div
        className="menuBardiv"
        style={menuBarRight ? { right: "0%" } : { right: "-100%" }}
      >
        <div className="menubarTop">
          <h1>Menubar</h1>
          <h3 onClick={() => setMenuBarRight(false)}>Go Back</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3>
            <Link
              to={"/history"}
              style={{ textDecoration: "none", color: "white" }}
            >
              History
            </Link>
          </h3>

          <h3
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            LogOut
          </h3>
        </div>
      </div>
      <div className="navBar">
        <h1 className="title">me_eting.</h1>
        <div className="navBar_right">
          <h4
            onClick={() => {
              navigate("/history");
            }}
            style={{ textDecoration: "none", color: "white" }}
          >
            History
          </h4>
          <h4
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="logOut"
            style={{ textDecoration: "none", color: "white" }}
          >
            LogOut
          </h4>
        </div>
        <div className="menuBar" onClick={() => setMenuBarRight(!menuBarRight)}>
          <span className="material-symbols-outlined">menu</span>
        </div>
      </div>
      <div className="landingPageContent">
        <div className="homePageContent_left">
          <div>Video calls and Meetings for everyone</div>
          <p>
            Connect, collaborate and celebrate from anywhere with me_eting.{" "}
          </p>
          <div className="meetingCodeJoin">
            <input
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              type="text"
              placeholder="Create or Enter Meeting Code"
            />
            <p onClick={handleJoinCall}>Join</p>
          </div>
        </div>
        <div className="homePageContent_right">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Home);
