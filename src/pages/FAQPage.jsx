import React, { useState } from "react";
import Swal from "sweetalert2";

const FAQPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State for the FAQ list and new FAQ inputs
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I create a profile?",
      answer:
        "To create a profile, simply sign up with your email address or phone number. You can also connect via a social media account like Facebook or Google for quick registration. After that, you'll be prompted to fill out your personal details such as name, age, interests, and upload a profile picture. Once complete, you can start browsing matches.",
      status: true,
    },
    {
      id: 2,
      question: "How does the matching algorithm work?",
      answer:
        "Our matching algorithm takes into account your preferences, profile details, and behavior on the app (likes, interests, interactions). It suggests profiles that align with your values, lifestyle, and interests, increasing the chances of a meaningful connection.",
      status: true,
    },
    {
      id: 3,
      question: "Is my data and personal information safe?",
      answer:
        "Yes, we take privacy and security seriously. All personal data is encrypted, and we use industry-standard security measures to protect your information. We do not share your details with third parties without your consent. You can read more in our Privacy Policy.",
      status: true,
    },
    {
      id: 4,
      question: "How can I report or block someone?",
      answer:
        'If you encounter inappropriate behavior or a profile that violates our guidelines, you can report or block the user. Simply go to the person\'s profile, click the "Report" or "Block" button, and follow the instructions. Our moderation team will review the issue and take necessary action.',
      status: false,
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Function to toggle FAQ status
  const handleToggleStatus = (id) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.id === id ? { ...faq, status: !faq.status } : faq
    );
    setFaqs(updatedFaqs);
  };

  // Function to delete FAQ
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this FAQ?",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
    }).then((isConfirmed) => {
      if (isConfirmed) {
        const updatedFaqs = faqs.filter((faq) => faq.id !== id);
        setFaqs(updatedFaqs);
        Swal.fire("Deleted!", "FAQ deleted successfully.", "success");
      }
    });
  };

  // Function to handle adding a new FAQ
  const handleAddFAQ = (e) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) {
      Swal.fire("Error", "Both question and answer are required!", "error");
      return;
    }

    if (isEditing) {
      const updatedFaqs = faqs.map((faq) =>
        faq.id === editingId
          ? { ...faq, question: newQuestion, answer: newAnswer }
          : faq
      );
      setFaqs(updatedFaqs);
      Swal.fire("Success", "FAQ updated successfully!", "success");
    } else {
      const newFAQ = {
        id: faqs.length + 1,
        question: newQuestion,
        answer: newAnswer,
        status: true,
      };
      setFaqs([...faqs, newFAQ]);
      Swal.fire("Success", "FAQ added successfully!", "success");
    }

    setNewQuestion("");
    setNewAnswer("");
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (faq) => {
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
    setIsEditing(true);
    setEditingId(faq.id);
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-regular fa-message-question"></i>
            <span className="mr-4">&nbsp; FAQ</span>
          </h1>
        </div>
      </div>

      {/* FAQ Form */}
      <div className="row">
        <div className="col-md-8 mx-auto px-5">
          <div className="tile">
            <div className="tile-body">
              <form onSubmit={handleAddFAQ}>
                <div className="row">
                  <div className="col-lg-12 mt-2">
                    <label className="form-label" htmlFor="new-question">
                      Question
                    </label>
                    <input
                      className="form-control"
                      id="new-question"
                      type="text"
                      placeholder="Question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-12 mt-3">
                    <label className="form-label" htmlFor="new-answer">
                      Answer
                    </label>
                    <textarea
                      className="form-control"
                      id="new-answer"
                      rows="3"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="col-lg-12 mt-3">
                    <button className="btn custom-btn text-white" type="submit">
                      {isEditing ? "Update FAQ" : "Submit"}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        className="btn btn-secondary ms-3"
                        onClick={() => {
                          setIsEditing(false);
                          setEditingId(null);
                          setNewQuestion("");
                          setNewAnswer("");
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

      {/* FAQ Table */}
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover dt-responsive">
                  <thead>
                    <tr>
                      <th>S.Num</th>
                      <th>Question</th>
                      <th>Answer</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faqs.map((faq, index) => (
                      <tr key={faq.id}>
                        <td>{index + 1}</td>
                        <td>{faq.question}</td>
                        <td>{faq.answer}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={faq.status}
                              onChange={() => handleToggleStatus(faq.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <a
                              href="javascript:void(0)"
                              className="glass-button"
                              onClick={() => handleEdit(faq)}
                            >
                              <i className="fa-light fa-pen-to-square"></i>
                            </a>

                            <a
                              href="javascript:void(0)"
                              className="glass-button2 delete"
                              onClick={() => handleDelete(faq.id)}
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
    </main>
  );
};

export default FAQPage;
