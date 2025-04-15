import React, { useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const SupportPage = () => {
  // State for the support tickets
  const [tickets, setTickets] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "rahul12@gmail.com",
      phone: "124578541",
      ticketName: "App Not Working",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      status: true,
    },
    {
      id: 2,
      name: "Mohit",
      email: "mohitder12@gmail.com",
      phone: "452124521",
      ticketName: "How to add Image",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      status: false,
    },
    {
      id: 3,
      name: "Arjun",
      email: "karjun12@gmail.com",
      phone: "4512541",
      ticketName: "DOB Change",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      status: true,
    },
  ]);

  // State for modal and ticket reply
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");

  // Handle ticket status toggle
  const handleToggleStatus = (id) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: !ticket.status } : ticket
    );
    setTickets(updatedTickets);
  };

  // Handle ticket deletion
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this ticket?",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
    }).then((isConfirmed) => {
      if (isConfirmed) {
        const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
        setTickets(updatedTickets);
        Swal.fire("Deleted!", "Ticket deleted successfully.", "success");
      }
    });
  };

  // Handle modal show for viewing ticket details
  const handleShowModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setReply("");
  };

  // Handle ticket reply
  const handleReply = (e) => {
    e.preventDefault();
    if (!reply) {
      Swal.fire("Error", "Please enter a reply!", "error");
      return;
    }
    Swal.fire("Success", "Reply submitted successfully!", "success");
    setReply("");
    setShowModal(false);
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-regular fa-money-bill-1"></i>
            <span className="mr-4">&nbsp; Support</span>
          </h1>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover dt-responsive">
                  <thead>
                    <tr>
                      <th>S.Num</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Ticket Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, index) => (
                      <tr key={ticket.id}>
                        <td>{index + 1}</td>
                        <td>{ticket.name}</td>
                        <td>{ticket.email}</td>
                        <td>{ticket.phone}</td>
                        <td>{ticket.ticketName}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={ticket.status}
                              onChange={() => handleToggleStatus(ticket.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <a
                              href="javascript:void(0)"
                              className="glass-button show-modal"
                              onClick={() => handleShowModal(ticket)}
                            >
                              <i className="fa-regular fa-eye"></i>
                            </a>
                            <a
                              href="javascript:void(0)"
                              className="glass-button2 delete"
                              onClick={() => handleDelete(ticket.id)}
                            >
                              <i className="fa-light fa-trash-can"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTicket?.ticketName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Details</h5>
            <p>{selectedTicket?.details}</p>
          </div>
          <Form.Group className="mb-3" controlId="replyTextarea">
            <Form.Label>Reply</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter reply here"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            className="btn btn-dark custom-btn btn-block"
            onClick={handleReply}
          >
            Submit Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default SupportPage;
