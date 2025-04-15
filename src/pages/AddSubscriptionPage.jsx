import React, { useState } from "react";
import Swal from "sweetalert2";

const AddSubscriptionPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "Basic", price: 245, cycle: "Monthly", status: true },
    { id: 2, name: "Standard", price: 999, cycle: "Quarterly", status: true },
    { id: 3, name: "Premium", price: 1250, cycle: "Yearly", status: true },
    // Add more for testing pagination
  ]);

  const [newSubscription, setNewSubscription] = useState({
    name: "",
    price: "",
    cycle: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubscription((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubscription = (e) => {
    e.preventDefault();
    const { name, price, cycle } = newSubscription;

    if (!name || !price || !cycle) {
      Swal.fire("Error", "Please fill all fields.", "error");
      return;
    }

    if (isEditing) {
      const updatedSubs = subscriptions.map((sub) =>
        sub.id === editingId ? { ...sub, name, price, cycle } : sub
      );
      setSubscriptions(updatedSubs);
      Swal.fire("Success", "Subscription updated successfully!", "success");
    } else {
      const newSub = {
        id: subscriptions.length + 1,
        name,
        price,
        cycle,
        status: true,
      };
      setSubscriptions([...subscriptions, newSub]);
      Swal.fire("Success", "Subscription added successfully!", "success");
    }

    setNewSubscription({ name: "", price: "", cycle: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (sub) => {
    setNewSubscription({
      name: sub.name,
      price: sub.price,
      cycle: sub.cycle,
    });
    setIsEditing(true);
    setEditingId(sub.id);
  };

  const handleStatusToggle = (id) => {
    const updated = subscriptions.map((s) =>
      s.id === id ? { ...s, status: !s.status } : s
    );
    setSubscriptions(updated);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this subscription?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = subscriptions.filter((s) => s.id !== id);
        setSubscriptions(filtered);
        Swal.fire("Deleted!", "Subscription deleted successfully.", "success");
      }
    });
  };

  const filteredData = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    for (let i = 0; i < totalPages; i++) {
      const active = i === currentPage;
      buttons.push(
        <button
          key={i}
          className={`page-btn ${active ? "active" : ""}`}
          style={{
            padding: "6px 10px",
            backgroundColor: active ? "#e9ecef" : "#e9ecef",
            color: active ? "002538" : "#002538",
            border: "1px solid lightgrey",
          }}
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
        <h1>
          <i className="fa-regular fa-money-bill-1"></i>
          <span className="ms-2">Add Subscription</span>
        </h1>
      </div>

      {/* Form */}
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <form onSubmit={handleAddSubscription}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Subscription Name</label>
                    <input
                      className="form-control mt-2"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={newSubscription.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Billing Cycle</label>
                    <select
                      className="form-select mt-2"
                      name="cycle"
                      value={newSubscription.cycle}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Cycle</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-between">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      className="form-control mt-2"
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={newSubscription.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <button
                      className="btn custom-btn text-white mt-3 me-3"
                      type="submit"
                    >
                      {isEditing ? "Update Subscription" : "Add Subscription"}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => {
                          setNewSubscription({
                            name: "",
                            price: "",
                            cycle: "",
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
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="row mt-4">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              {/* Search and entries */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(0);
                    }}
                    className="form-select"
                    style={{ width: "100px", display: "inline-block" }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="ms-2">entries per page</span>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Search by name"
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

              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Cycle</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((sub, index) => (
                      <tr key={sub.id}>
                        <td>{index + 1 + currentPage * itemsPerPage}</td>
                        <td>{sub.name}</td>
                        <td>{sub.price}</td>
                        <td>{sub.cycle}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={sub.status}
                              onChange={() => handleStatusToggle(sub.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <a
                              href="javascript:void(0)"
                              className="glass-button"
                              onClick={() => handleEdit(sub)}
                            >
                              <i className="fa-light fa-pen-to-square"></i>
                            </a>

                            <a
                              href="javascript:void(0)"
                              className="glass-button2 delete"
                              onClick={() => handleDelete(sub.id)}
                            >
                              <i className="fa-light fa-trash-can"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  Showing {currentPage * itemsPerPage + 1} to{" "}
                  {Math.min(
                    (currentPage + 1) * itemsPerPage,
                    filteredData.length
                  )}{" "}
                  of {filteredData.length} entries
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
    </main>
  );
};

export default AddSubscriptionPage;
