import { useEffect, useState } from "react";
import "../App.css";
import image from "../assets/videocall.webp";
import { Link, useNavigate } from "react-router-dom";
function LandingPage() {
  const route = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      route("/home");
    }
  });

  const [menuBarRight, setMenuBarRight] = useState(false);

  return (
    <>
      <div className="landingPageContainer">
        <div
          className="menuBardiv"
          style={menuBarRight ? { right: "0%" } : { right: "-100%" }}
        >
          <div className="menubarTop">
            <h1>Menubar</h1>
            <h3 onClick={() => setMenuBarRight(false)}>Go Back</h3>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>

          <h3>
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "white" }}
              >
              Sign up
            </Link>
          </h3>

          <h3>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
              >
              Login
            </Link>
          </h3>
              </div>
        </div>
        <div className="navBar">
          <h1 className="title">me_eting.</h1>
          <div className="navBar_right">
            <h4>
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign up
              </Link>
            </h4>
            <h4 className="loginbtn">
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </Link>
            </h4>
          </div>
          <div
            className="menuBar"
            onClick={() => setMenuBarRight(!menuBarRight)}
          >
            <span className="material-symbols-outlined">menu</span>
          </div>
        </div>
        <div className="landingPageContent">
          <div className="landingPageContent_left">
            <p>Welcome to me_eting – Secure Video Collaboration.</p>
            <div>
              Virtual <p className="highlightWord">Meetings</p>
            </div>
            <div>Platform For Online Confrence Video</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              aliquid vitae officia, praesentium minima labore, laborum quos
              dicta, hic repellat beatae perferendis placeat. Nostrum placeat
              omnis excepturi, optio reprehenderit exercitationem?
            </div>
            <p role="button" className="getStartBtn">
              <Link
                to={"/home"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Get Started
              </Link>{" "}
            </p>
          </div>
          <div className="landingPageContent_right">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
