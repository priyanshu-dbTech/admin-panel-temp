import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false); // State to toggle between login and forgot password form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Email:", email);
    console.log("Password:", password);
    navigate("/");
    // Add login logic here
  };

  // Handle password reset form submission
  const handleResetSubmit = (e) => {
    e.preventDefault();
    console.log("Reset Email:", resetEmail);
    // Add password reset logic here
  };

  return (
    <main className="bg-img">
      <section className="login-content">
        <div className="row">
          <div className="col-lg-8 offset-lg-4">
            <div className={`login-box ${isFlipped ? "flipped" : ""}`}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <form className="login-form" onSubmit={handleLoginSubmit}>
                    <div className="logo mx-auto text-center">
                      <img
                        className="w-50"
                        src="/src/assets/images/logo.png"
                        alt="Logo"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-white">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-white">Password</label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <div className="utility">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                            <span className="label-text">Stay Signed in</span>
                          </label>
                        </div>
                        <p className="semibold-text mb-2">
                          <a
                            href="#"
                            className="custom-link text-decoration-none"
                            onClick={() => setIsFlipped(true)}
                          >
                            Forgot Password?
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mb-3 btn-container d-grid">
                      <button
                        className="btn btn-dark custom-btn btn-block"
                        type="submit"
                      >
                        <i className="bi bi-box-arrow-in-right me-2 fs-5"></i>{" "}
                        SIGN IN
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flip-card-back">
                  <form className="forget-form" onSubmit={handleResetSubmit}>
                    <h3 className="login-head">
                      <i className="bi bi-person-lock me-2"></i> Forgot
                      Password?
                    </h3>
                    <div className="mb-3">
                      <label className="form-label">Enter Email id</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 btn-container d-grid">
                      <button
                        className="btn btn-dark custom-btn btn-block"
                        type="submit"
                      >
                        <i className="bi bi-unlock me-2 fs-5"></i> RESET
                      </button>
                    </div>
                    <div className="mb-3 mt-3 pb-5">
                      <p className="semibold-text mb-5 pb-5">
                        <a
                          href="#"
                          className="custom-link text-decoration-none"
                          onClick={() => setIsFlipped(false)}
                        >
                          <i className="bi bi-chevron-left me-1"></i> Back to
                          Login
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
