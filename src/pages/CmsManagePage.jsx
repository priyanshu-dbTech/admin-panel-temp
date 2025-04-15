import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";

const CmsManagement = () => {
  const editorRef = useRef(null);
  const api_key = "mock_API_KEy";

  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageName, setPageName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [errors, setErrors] = useState({ pageName: "", editorContent: "" });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  const fetchData = () => {
    setTimeout(() => {
      const pages = [
        {
          srNum: 1,
          title: "About us",
          content: "This is the content of the About us page.",
          status: "Active",
        },
        {
          srNum: 2,
          title: "Terms & Conditions",
          content: "This is the content of the Terms & Conditions page.",
          status: "Active",
        },
        {
          srNum: 3,
          title: "Privacy Policy",
          content: "This is the content of the Privacy Policy page.",
          status: "Inactive",
        },
      ];
      setTableData(pages);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const filteredData = tableData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
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
          style={{
            padding: "6px 10px",
            backgroundColor: isActive ? "#e9ecef" : "#e9ecef",
            color: isActive ? "002538" : "#002538",
            border: "1px solid lightgrey",
          }}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  const toggleStatus = (srNum) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.srNum === srNum
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  const resetForm = () => {
    setPageName("");
    setEditorContent("");
    setErrors({ pageName: "", editorContent: "" });
    setEditingItem(null);
    if (editorRef.current) {
      editorRef.current.setContent("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { pageName: "", editorContent: "" };
    if (!pageName) newErrors.pageName = "Page Name is required.";
    if (!editorContent.trim()) newErrors.editorContent = "Content is required.";
    if (newErrors.pageName || newErrors.editorContent) {
      setErrors(newErrors);
      return;
    }

    Swal.fire({
      title: editingItem ? "Update Page?" : "Add New Page?",
      text: editingItem
        ? "Do you want to update this CMS page?"
        : "Do you want to add this CMS page?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (editingItem) {
          setTableData((prevData) =>
            prevData.map((item) =>
              item.srNum === editingItem.srNum
                ? { ...item, title: pageName, content: editorContent }
                : item
            )
          );
        } else {
          const newItem = {
            srNum: tableData.length + 1,
            title: pageName,
            content: editorContent,
            status: "Active",
          };
          setTableData([...tableData, newItem]);
        }
        resetForm();
        setIsModalOpen(false);
        Swal.fire("Success!", "Page saved successfully.", "success");
      }
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setPageName(item.title);
    setEditorContent(item.content);
    setIsModalOpen(true);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 className="fw-bold">CMS Pages</h1>
      </div>

      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile p-3">
            <div className="tile-body">
              {/* Controls */}
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="form-select"
                    style={{ width: "80px" }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries per page</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn custom-btn text-white"
                    onClick={() => {
                      resetForm();
                      setIsModalOpen(true);
                    }}
                  >
                    <i className="fa fa-plus me-1"></i> Add Page
                  </button>

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                    placeholder="Search..."
                    style={{ width: "200px" }}
                  />
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover dt-responsive">
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Page Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length ? (
                      paginatedData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1 + currentPage * itemsPerPage}</td>
                          <td>{item.title}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={item.status === "Active"}
                                onChange={() => toggleStatus(item.srNum)}
                              />
                            </div>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0)"
                              className="glass-button"
                              onClick={() => handleEdit(item)}
                            >
                              <i className="fa-light fa-pen-to-square"></i>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No pages found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay px-5">
          <div className="modal-content" ref={modalRef}>
            <div
              className="p-3 tile"
              style={{ overflow: "auto", backgroundColor: "white" }}
            >
              <h4 className="mb-3">
                {editingItem ? "Edit CMS Page" : "Add CMS Page"}
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Page Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.pageName ? "is-invalid" : ""
                    }`}
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                  />
                  {errors.pageName && (
                    <div className="invalid-feedback">{errors.pageName}</div>
                  )}
                </div>

                <div>
                  <Editor
                    onEditorChange={(content) => setEditorContent(content)}
                    value={editorContent}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                      plugins: [
                        "anchor",
                        "autolink",
                        "charmap",
                        "codesample",
                        "emoticons",
                        "image",
                        "link",
                        "lists",
                        "media",
                        "searchreplace",
                        "table",
                        "visualblocks",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                    }}
                  />{" "}
                </div>
                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn custom-btn text-white me-2"
                  >
                    {editingItem ? "Update Page" : "Add Page"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CmsManagement;
