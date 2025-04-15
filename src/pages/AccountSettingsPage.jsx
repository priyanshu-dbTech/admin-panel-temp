import React, { useState } from "react";
import Swal from "sweetalert2";

const AccountSettingsPage = () => {
  // State for the password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // With this:
  const [visibleFields, setVisibleFields] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Then define this function:
  const togglePasswordVisibility = (field) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    // Here you would normally handle the password change logic (e.g., API call)
    Swal.fire("Success", "Password changed successfully!", "success");

    // Reset the form
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-regular fa-gear"></i>
            <span className="mr-4">&nbsp; Account Settings</span>
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 px-5 mx-auto">
          <div className="tile">
            <div className="tile-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Old Password */}
                  <div className="col-lg-12 mt-3">
                    <label className="form-label" htmlFor="old-password">
                      Old Password
                    </label>
                    <div className="input-group flex-nowrap">
                      <input
                        type={visibleFields.old ? "text" : "password"}
                        className="form-control password-field"
                        id="old-password"
                        placeholder="**********"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        style={{
                          backgroundColor: "#e1e1e1",
                        }}
                        onClick={() => togglePasswordVisibility("old")}
                      >
                        <i
                          className={
                            visibleFields.old
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="col-lg-12 mt-3">
                    <label className="form-label" htmlFor="new-password">
                      New Password
                    </label>
                    <div className="input-group flex-nowrap">
                      <input
                        type={visibleFields.new ? "text" : "password"}
                        className="form-control password-field"
                        id="new-password"
                        placeholder="Enter Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        style={{
                          backgroundColor: "#e1e1e1",
                        }}
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        <i
                          className={
                            visibleFields.new
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="col-lg-12 mt-3">
                    <label className="form-label" htmlFor="confirm-password">
                      Confirm Password
                    </label>
                    <div className="input-group flex-nowrap">
                      <input
                        type={visibleFields.confirm ? "text" : "password"}
                        className="form-control password-field"
                        id="confirm-password"
                        placeholder="Enter Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        style={{
                          backgroundColor: "#e1e1e1",
                        }}
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        <i
                          className={
                            visibleFields.confirm
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-lg-12 mt-3">
                    <button
                      className="btn custom-btn text-white col-lg-w-25"
                      type="submit"
                    >
                      <i className="icon pr-2 fa-solid fa-key-skeleton"></i>{" "}
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountSettingsPage;
