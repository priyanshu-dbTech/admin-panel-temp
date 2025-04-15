import React, { useState } from "react";
import Swal from "sweetalert2";

const DataEntryPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [entries, setEntries] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "demo@gmail.com",
      phone: "1234561245",
      details: "Lorem Ipsum is simply ....",
    },
    {
      id: 2,
      name: "Mohint",
      email: "demo@gmail.com",
      phone: "7845685210",
      details: "Lorem Ipsum is simply ....",
    },
    {
      id: 3,
      name: "Ankit",
      email: "demo@gmail.com",
      phone: "7895486540",
      details: "Lorem Ipsum is simply ....",
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    const { name, email, phone, details } = newEntry;

    if (!name || !email || !phone || !details) {
      Swal.fire("Error", "Please fill all fields.", "error");
      return;
    }

    if (isEditing) {
      const updatedEntries = entries.map((entry) =>
        entry.id === editingId
          ? { ...entry, name, email, phone, details }
          : entry
      );
      setEntries(updatedEntries);
      Swal.fire("Success", "Entry updated successfully!", "success");
    } else {
      const newData = {
        id: entries.length + 1,
        name,
        email,
        phone,
        details,
      };
      setEntries([...entries, newData]);
      Swal.fire("Success", "Entry added successfully!", "success");
    }

    setNewEntry({ name: "", email: "", phone: "", details: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (entry) => {
    setNewEntry({
      name: entry.name,
      email: entry.email,
      phone: entry.phone,
      details: entry.details,
    });
    setIsEditing(true);
    setEditingId(entry.id);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
    }).then((isConfirmed) => {
      if (isConfirmed.isConfirmed) {
        const updatedEntries = entries.filter((entry) => entry.id !== id);
        setEntries(updatedEntries);
        Swal.fire("Deleted!", "Entry deleted successfully.", "success");
      }
    });
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.phone.includes(searchTerm) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = filteredEntries.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const getPaginationButtons = () => {
    const buttons = [];
    for (let i = 0; i < totalPages; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          className={`page-btn ${isActive ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-light fa-file-chart-column"></i>
            <span className="mr-4">&nbsp; Data Entry</span>
          </h1>
        </div>
      </div>

      {/* Add Entry Form */}
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <form onSubmit={handleAddEntry}>
                <div className="row">
                  <div className="mb-3 col-lg-4">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={newEntry.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3 col-lg-4">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={newEntry.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3 col-lg-4">
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="form-control"
                      id="phone"
                      type="number"
                      placeholder="Phone"
                      name="phone"
                      value={newEntry.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label className="form-label" htmlFor="details">
                      Details
                    </label>
                    <textarea
                      className="form-control"
                      id="details"
                      rows="3"
                      placeholder="Comment"
                      name="details"
                      value={newEntry.details}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3 col-lg-4">
                    <button className="btn custom-btn text-white" type="submit">
                      <i className="fa-thin fa-paper-plane"></i> &nbsp;
                      {isEditing ? "Update Entry" : "Submit"}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        className="btn btn-secondary ms-3"
                        onClick={() => {
                          setNewEntry({
                            name: "",
                            email: "",
                            phone: "",
                            details: "",
                          });
                          setIsEditing(false);
                          setEditingId(null);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Table + Pagination */}
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <div className="d-flex justify-content-between mb-3">
                <div>
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
                <div className="d-flex align-items-center">
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
                      <th>About</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEntries.map((entry, index) => (
                      <tr key={entry.id}>
                        <td>{index + 1 + currentPage * itemsPerPage}</td>
                        <td>{entry.name}</td>
                        <td>{entry.email}</td>
                        <td>{entry.phone}</td>
                        <td>{entry.details}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <a
                              href="javascript:void(0)"
                              className="glass-button"
                              onClick={() => handleEdit(entry)}
                            >
                              <i className="fa-light fa-pen-to-square"></i>
                            </a>
                            <a
                              href="javascript:void(0)"
                              className="glass-button2 delete"
                              onClick={() => handleDelete(entry.id)}
                            >
                              <i className="fa-light fa-trash-can"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span>
                    Showing {currentPage * itemsPerPage + 1} to{" "}
                    {Math.min(
                      (currentPage + 1) * itemsPerPage,
                      filteredEntries.length
                    )}{" "}
                    of {filteredEntries.length} entries
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

export default DataEntryPage;
