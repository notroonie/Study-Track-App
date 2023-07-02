import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/welcome.svg";
import { useAppContext } from "../../context/context";

const Welcome = () => {
  const { user } = useAppContext();
  return (
    <main>
      <div className="landing-main">
        <div className="text">
          <h2>Welcome, {user.name}</h2>
          <p>
            Take a look at the <br />
            available tasks here. <br />
            <Link to="/all-tasks" className="btn" style={{ marginTop: "1em" }}>
              All tasks
            </Link>
          </p>
        </div>
        <img src={logo} alt="welcome" className="img-welcome" />
      </div>
    </main>
  );
};

export default Welcome;
