import React, { useState } from "react";
import Dropify from "dropify"; // Assuming Dropify JS is imported from CDN or package
import Swal from "sweetalert2";

const HobbiesPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [hobbies, setHobbies] = useState([
    {
      id: 1,
      name: "Photography",
      icon: "/src/assets/images/icon-1.png",
      status: true,
    },
    {
      id: 2,
      name: "Cooking",
      icon: "/src/assets/images/icon-2.png",
      status: true,
    },
    {
      id: 3,
      name: "Drawing",
      icon: "/src/assets/images/icon-3.png",
      status: true,
    },
    {
      id: 4,
      name: "Yoga",
      icon: "/src/assets/images/icon-4.png",
      status: true,
    },
    {
      id: 5,
      name: "Traveling",
      icon: "/src/assets/images/icon-5.png",
      status: true,
    },
  ]);

  // State for new hobby input
  const [newHobbyName, setNewHobbyName] = useState("");
  const [newHobbyIcon, setNewHobbyIcon] = useState(null);

  // Handle hobby form submission
  const handleAddHobby = (e) => {
    e.preventDefault();

    if (!newHobbyName || (!newHobbyIcon && !isEditing)) {
      Swal.fire("Error", "Please provide both hobby name and icon.", "error");
      return;
    }

    if (isEditing) {
      const updatedHobbies = hobbies.map((hobby) =>
        hobby.id === editingId
          ? {
              ...hobby,
              name: newHobbyName,
              icon: newHobbyIcon
                ? URL.createObjectURL(newHobbyIcon)
                : hobby.icon, // keep old icon if not changed
            }
          : hobby
      );
      setHobbies(updatedHobbies);
      Swal.fire("Success", "Hobby updated successfully.", "success");
    } else {
      const newHobby = {
        id: hobbies.length + 1,
        name: newHobbyName,
        icon: URL.createObjectURL(newHobbyIcon),
        status: true,
      };
      setHobbies([...hobbies, newHobby]);
      Swal.fire("Success", "Hobby added successfully.", "success");
    }

    // Reset form
    setNewHobbyName("");
    setNewHobbyIcon(null);
    setIsEditing(false);
    setEditingId(null);
  };

  // Handle toggle status
  const toggleStatus = (id) => {
    const updatedHobbies = hobbies.map((hobby) =>
      hobby.id === id ? { ...hobby, status: !hobby.status } : hobby
    );
    setHobbies(updatedHobbies);
  };

  // Handle delete hobby
  const handleDeleteHobby = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this hobby?",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
    }).then((isConfirmed) => {
      if (isConfirmed) {
        const filteredHobbies = hobbies.filter((hobby) => hobby.id !== id);
        setHobbies(filteredHobbies);
        Swal.fire("Deleted!", "Hobby deleted successfully.", "success");
      }
    });
  };

  const handleEdit = (hobby) => {
    setNewHobbyName(hobby.name);
    setNewHobbyIcon(null); // File inputs can't be pre-filled
    setIsEditing(true);
    setEditingId(hobby.id);
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-light fa-sparkles"></i>
            <span className="mr-4">&nbsp;Hobbies</span>
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7 px-5 mx-auto">
          <div className="tile">
            <div className="tile-body">
              <form onSubmit={handleAddHobby}>
                <div className="row">
                  <div className="col-lg-12 mt-3">
                    <div className="form-group">
                      <label className="form-label pb-2" htmlFor="">
                        Upload Hobbies icon
                      </label>
                      <input
                        name="file1"
                        type="file"
                        className="dropify form-control mt-2"
                        data-height="100"
                        onChange={(e) => setNewHobbyIcon(e.target.files[0])}
                      />
                    </div>

                    <div className="form-group pt-4">
                      <label className="form-label pt-3" htmlFor="">
                        Hobbies Name
                      </label>
                      <input
                        className="form-control mt-2"
                        type="text"
                        placeholder="Name"
                        value={newHobbyName}
                        onChange={(e) => setNewHobbyName(e.target.value)}
                      />
                    </div>

                    <div className="form-group pt-5 mx-auto">
                      <button
                        className="btn custom-btn text-white w-50 mt-40"
                        type="submit"
                      >
                        <i className="icon fa-light fa-image pr-2"></i>{" "}
                        {isEditing ? "Update Hobby" : "Add Hobby"}
                      </button>
                      {isEditing && (
                        <button
                          type="button"
                          className="btn btn-secondary ms-3"
                          onClick={() => {
                            setIsEditing(false);
                            setEditingId(null);
                            setNewHobbyName("");
                            setNewHobbyIcon(null);
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
      </div>

      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover dt-responsive">
                  <thead>
                    <tr>
                      <th>S.Num</th>
                      <th>Hobbies Icon</th>
                      <th>Hobbies Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hobbies.map((hobby, index) => (
                      <tr key={hobby.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            className="img-small"
                            src={hobby.icon}
                            alt={hobby.name}
                          />
                        </td>
                        <td>{hobby.name}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={hobby.status}
                              onChange={() => toggleStatus(hobby.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <a
                              href="javascript:void(0)"
                              className="glass-button"
                              onClick={() => handleEdit(hobby)}
                            >
                              <i className="fa-light fa-pen-to-square"></i>
                            </a>

                            <a
                              href="javascript:void(0)"
                              className="glass-button2 delete"
                              onClick={() => handleDeleteHobby(hobby.id)}
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

export default HobbiesPage;
