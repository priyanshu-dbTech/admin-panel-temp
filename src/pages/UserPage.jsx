import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DEFAULT_ITEMS_PER_PAGE = 10;

const UserPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Rahul",
      email: "demo@gmail.com",
      phone: "1234561245",
      plan: "Basic",
      planExpire: "24-08-2024",
      status: true,
    },
    {
      id: 2,
      username: "Mohint",
      email: "demo@gmail.com",
      phone: "7845685210",
      plan: "Standard",
      planExpire: "02-01-2025",
      status: true,
    },
    {
      id: 3,
      username: "Ankit",
      email: "demo@gmail.com",
      phone: "7895486540",
      plan: "Premium",
      planExpire: "02-12-2024",
      status: false,
    },
  ]);

  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "User deleted successfully.", "success");
      }
    });
  };

  const visiblePages = 4;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    let startPage = Math.max(0, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(0, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          d
          className={`page-btn ${isActive ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };
  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-light fa-sharp fa-light fa-users"></i>
            <span className="mr-4">&nbsp; All Users</span>
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <div className="table-controls mb-3 d-flex justify-content-between align-items-center">
                <div className="items-per-page-container">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(0);
                    }}
                    className="form-select"
                    style={{ width: "80px", display: "inline-block" }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="ms-2">entries per page</span>
                </div>

                <div className="search-container d-flex align-items-center">
                  <span className="me-2">Search:</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(0);
                    }}
                    className="form-control"
                    style={{ width: "200px" }}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover dt-responsive">
                  <thead>
                    <tr>
                      <th>S.Num</th>
                      <th>Username</th>
                      <th>Email ID</th>
                      <th>Phone Number</th>
                      <th>Subscription Plan</th>
                      <th>Plan Expired</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1 + currentPage * itemsPerPage}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.plan === "Basic"
                                ? "bg-secondary"
                                : user.plan === "Standard"
                                ? "bg-danger"
                                : "bg-warning"
                            }`}
                          >
                            {user.plan}
                          </span>
                        </td>
                        <td>{user.planExpire}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={user.status}
                              onChange={() => {
                                const updatedUsers = users.map((u) =>
                                  u.id === user.id
                                    ? { ...u, status: !u.status }
                                    : u
                                );
                                setUsers(updatedUsers);
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              to={`/user-details/${user.id}`}
                              className="glass-button"
                            >
                              <i className="fa-regular fa-eye"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="glass-button2 delete"
                            >
                              <i className="fa-light fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Footer */}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span>
                    Showing {currentPage * itemsPerPage + 1} to{" "}
                    {Math.min(
                      (currentPage + 1) * itemsPerPage,
                      filteredUsers.length
                    )}{" "}
                    of {filteredUsers.length} entries
                  </span>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                        borderRadius: "5px 0px 0px 5px",
                      }}
                      className="page-btn"
                      onClick={() => handlePageChange(0)}
                      disabled={currentPage === 0}
                      aria-label="First Page"
                    >
                      &laquo;
                    </button>
                    <button
                      style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                      }}
                      className="page-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      aria-label="Previous Page"
                    >
                      &#x3c;
                    </button>
                    {getPaginationButtons()}
                    <button
                      style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                      }}
                      className="page-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages - 1}
                      aria-label="Next Page"
                    >
                      &#x3e;
                    </button>
                    <button
                      style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                      className="page-btn"
                      onClick={() => handlePageChange(totalPages - 1)}
                      disabled={currentPage >= totalPages - 1}
                      aria-label="Last Page"
                    >
                      &raquo;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
