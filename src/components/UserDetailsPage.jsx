import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import userBgImage from "../assets/images/young-couple.png";
import userProfile from "../assets/images/profile-7.png";
import userImage1 from "../assets/images/profile-5.png";
import userImage2 from "../assets/images/profile-6.png";
import userImage3 from "../assets/images/profile-7.png";

import icon1 from "../assets/images/icon-1.png";
import icon2 from "../assets/images/icon-2.png";
import icon3 from "../assets/images/icon-3.png";

import Swal from "sweetalert2";

const UserDetailsPage = () => {
  const [showModal, setShowModal] = useState(false); // To toggle modal visibility
  const user = {
    username: "Margaret",
    age: 26,
    gender: "Woman (she/her)",
    phone: "7057451220",
    height: "153 cm",
    location: "London",
    bio: `Living life one pose at a time. As a model, I've learned to embrace beauty in all its forms. When I'm not on the runway, I'm exploring new places and creating art with my own unique style. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    relationship: "Long-term Relationship",
    religion: "Christianity",
    dob: "19 08 1992",
    hobbies: ["Writing", "Cooking", "Drawing"],
    lifestyle: ["Non-Drinker", "Non-smoker", "Sometimes"],
    photos: [userImage1, userImage2, userImage3],
    icons: [icon1, icon2, icon3],
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
    }).then((isConfirmed) => {
      if (isConfirmed) {
        Swal.fire("Deleted!", "User deleted successfully.", "success");
      }
    });
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-light fa-user"></i>
            <span className="mr-4">&nbsp; User Details</span>
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 px-3">
          <div className="tile rounded-2">
            <div className="tile-body">
              <div className="row">
                {/* User Info */}
                <div className="col-md-12">
                  <img
                    className="w-100 timline img-fluid"
                    src={userBgImage}
                    alt="User Cover"
                  />
                </div>
                <div className="col-md-11 mx-auto">
                  <div className="row set-pos d-flex align-items-center">
                    <div className="col-lg-5 pt-2">
                      <div className="row pt-2 d-flex align-items-center">
                        <div className="col-xl-3 col-lg-3 col-sm-3">
                          <img
                            className="img-small"
                            src={userProfile}
                            alt="User Avatar"
                          />
                        </div>
                        <div className="col-xl-9 col-lg-9 col-sm-9">
                          <h3>
                            {user.username}, {user.age}
                          </h3>
                          <h5>
                            <i className="fa-light fa-mars"></i> &nbsp;{" "}
                            {user.gender}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 pt-2">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-sm-4 font-3 gap-2 d-inline-flex">
                          <i className="fa-solid fa-mobile-screen"></i>{" "}
                          {user.phone}
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-4 font-3 gap-2 d-inline-flex">
                          <i className="fa-regular fa-tape"></i> {user.height}
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-4 font-3 gap-2 d-inline-flex">
                          <i className="fa-sharp fa-light fa-house"></i>{" "}
                          {user.location}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 pt-2 d-flex justify-content-lg-end">
                      <button
                        className="glass-button2"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        onClick={toggleModal}
                      >
                        <i className="fa-light fa-pen-to-square"></i>&nbsp;
                        Report
                      </button>
                    </div>
                  </div>

                  <div className="col-md-11 mx-auto mt-4 mb-4">
                    <div className="row pt-3">
                      <div className="col-lg-12 mb-3">
                        <h2 className="text-cl">About Bio</h2>
                        <p>{user.bio}</p>
                      </div>
                      <div className="col-lg-4">
                        <h5 className="gap-2 text-cl">Relationship Goals</h5>
                        <div className="font-3 gap-2 d-inline-flex">
                          <i className="fa-light fa-people-simple"></i>{" "}
                          {user.relationship}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <h5 className="gap-2 text-cl">Religion</h5>
                        <div className="font-3 gap-2 d-inline-flex">
                          <i className="fa-sharp fa-regular fa-yin-yang"></i>{" "}
                          {user.religion}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <h5 className="gap-2 text-cl">DOB</h5>
                        <div className="font-3 gap-2 d-inline-flex">
                          <i className="fa-regular fa-calendar-days"></i>{" "}
                          {user.dob}
                        </div>
                      </div>
                      <hr className="mt-3" />

                      <div className="col-lg-6 mt-3">
                        <h5 className="mt-0 mb-3 text-cl">
                          Hobbies & Interests
                        </h5>
                        {user.hobbies.map((hobby, index) => (
                          <div key={index} className="tag">
                            <img
                              className="mr-3"
                              src={user.icons[index]}
                              alt={hobby}
                            />
                            <h6 className="mt-0 pl-3">{hobby}</h6>
                          </div>
                        ))}
                      </div>

                      <div className="col-lg-6 mt-3">
                        <h5 className="mt-0 mb-3 text-cl">Lifestyle</h5>
                        {user.lifestyle.map((life, index) => (
                          <div key={index} className="tag">
                            <img
                              className="mr-3"
                              src={user.icons[index]}
                              alt={life}
                            />
                            <h6 className="mt-0 pl-3">{life}</h6>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Photo Gallery */}
                    <div className="col-lg-6 mt-3">
                      <h5 className="mt-0 mb-3 text-cl">All Photos</h5>
                      <div
                        className="gallery-container d-flex"
                        id="lightGallery"
                      >
                        {user.photos.map((photo, index) => (
                          <a
                            key={index}
                            className="gallery-item shine"
                            data-src={photo}
                          >
                            <img
                              className="img-fluid"
                              src={photo}
                              alt={`User Photo ${index + 1}`}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <Modal show={showModal} onHide={toggleModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Details..." />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Screenshot</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="custom-btn text-white"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default UserDetailsPage;
