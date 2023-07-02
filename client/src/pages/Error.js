import React from "react";
import { Link } from "react-router-dom";

import error from "../assets/images/error.svg";

const Error = () => {
  return (
    <section className="error">
      <img src={error} alt="not found" className="img-error" />
      <div className="error-container">
        <h4 style={{ display: "block" }}>Oops! page not found...</h4>
        <Link to="/" className="btn-member">
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default Error;
