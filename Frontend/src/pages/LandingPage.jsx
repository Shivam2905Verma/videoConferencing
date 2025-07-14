import { useEffect } from "react";
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

  return (
    <>
      <div className="landingPageContainer">
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
          <div className="menuBar">
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
