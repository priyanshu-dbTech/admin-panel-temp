import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-light fa-gauge-high"></i> Dashboard
          </h1>
        </div>
        <ul className="app-breadcrumb breadcrumb"></ul>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            {/* Widget 1 */}
            <div className="col-md-4 col-lg-4">
              <Link to="/user" className="text-decoration-none">
                <div className="widget-small ctm-bg-4 coloured-icon">
                  <i className="icon fa-sharp fa-light fa-users"></i>
                  <div className="info">
                    <h4>Total active user</h4>
                    <p>
                      <b>500</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Widget 2 */}
            <div className="col-md-4 col-lg-4">
              <Link to="/hobbies" className="text-decoration-none">
                <div className="widget-small ctm-bg-2 coloured-icon">
                  <i className="icon fa-light fa-sparkles"></i>
                  <div className="info">
                    <h4>Hobbies</h4>
                    <p>
                      <b>12</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Widget 3 */}
            <div className="col-md-4 col-lg-4">
              <Link to="/cms-manage" className="text-decoration-none">
                <div className="widget-small ctm-bg-1 coloured-icon">
                  <i className="icon fa-thin fa-file-lines"></i>
                  <div className="info">
                    <h4>All Pages</h4>
                    <p>
                      <b>3</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Widget 4 */}
            <div className="col-md-4 col-lg-4">
              <Link to="/subscription" className="text-decoration-none">
                <div className="widget-small ctm-bg-1 coloured-icon">
                  <i className="icon fa-regular fa-money-bill-1"></i>
                  <div className="info">
                    <h4>Subscription Plan</h4>
                    <p>
                      <b>4</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Widget 5 */}
            <div className="col-md-4 col-lg-4">
              <Link to="/data-entry" className="text-decoration-none">
                <div className="widget-small ctm-bg-1 coloured-icon">
                  <i className="icon fa-light fa-file-chart-column"></i>
                  <div className="info">
                    <h4>Data Entry</h4>
                    <p>
                      <b>6</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Widget 6 */}
            <div className="col-md-4 col-lg-4">
              <Link to="/payment-management" className="text-decoration-none">
                <div className="widget-small ctm-bg-1 coloured-icon">
                  <i className="icon fa-light fa-credit-card"></i>
                  <div className="info">
                    <h4>Total Payment</h4>
                    <p>
                      <b>$ 45200</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
