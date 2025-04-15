import React, { useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useRef, useEffect } from "react";
import logoImage from "../assets/images/logo-white.png";
import avatar from "../assets/images/avatar.png";

const Header = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const sidebarRef = useRef(null);
  const profileMenuRef = useRef(null);
  const [profileMenu, setProfileMenu] = useState(false);

  // Rest of your state and code...

  useEffect(() => {
    const treeviewMenu = $(".app-menu");

    // Handle click event for treeview toggles
    $("[data-toggle='treeview']").click(function (event) {
      event.preventDefault();
      const $parent = $(this).parent();

      // Close all expanded treeviews except the one being clicked
      treeviewMenu.find(".is-expanded").not($parent).removeClass("is-expanded");

      // Toggle the current treeview
      $parent.toggleClass("is-expanded");
    });

    const currentUrl = window.location.href;
    let isAnyExpanded = false;

    // Expand the parent if the current URL matches any link
    $(".app-menu a").each(function () {
      if (this.href === currentUrl) {
        $(this).parent().parent().prev().click();
      }
    });

    $(".treeview-menu a").each(function () {
      if (this.href === currentUrl) {
        $(this).parent().parent().prev().click();
        $(this).closest(".treeview").addClass("is-expanded");
        isAnyExpanded = true;
      }
    });

    if (isAnyExpanded) {
      treeviewMenu
        .find("[data-toggle='treeview']")
        .parent()
        .addClass("is-expanded");
    }

    // Handle sidebar toggle
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $(".app").toggleClass("sidebar-mini sidenav-toggled");
    });

    // Cleanup function
    return () => {
      // Safely remove click event handlers if the elements exist
      if ($("[data-toggle='treeview']").length) {
        $("[data-toggle='treeview']").off("click");
      }

      if ($('[data-toggle="sidebar"]').length) {
        $('[data-toggle="sidebar"]').off("click");
      }
    };
  }, []);

  const handleToggle = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenu(false); // Close menu when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="app-header">
        <Link to="/index" className="app-header__logo">
          <img className="w-50" src={logoImage} alt="Logo" />
        </Link>
        {/* Sidebar toggle button */}
        <a
          href="#"
          className="app-sidebar__toggle"
          data-toggle="sidebar"
          aria-label="Hide Sidebar"
          onClick={handleToggle}
        ></a>
        {/* Navbar Right Menu */}
        <ul className="app-nav">
          {/* User Menu */}
          <li className="dropdown">
            <a
              className="app-nav__item"
              href="#"
              data-bs-toggle="dropdown"
              aria-label="Open Profile Menu"
              onClick={() => setProfileMenu((prev) => !prev)}
            >
              <i className="bi bi-person fs-4"></i>
            </a>
            {profileMenu && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  right: "0",
                  left: "auto",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "5px",
                  listStyle: "none",
                  zIndex: "9999",
                }}
                ref={profileMenuRef}
              >
                <li>
                  <Link className="dropdown-item" to="/account-settings">
                    <i className="fa-sharp fa-light fa-bell me-2 fs-5"></i>{" "}
                    Settings
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/login">
                    <i className="bi bi-box-arrow-right me-2 fs-5"></i> Logout
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </header>

      {/* Sidebar menu */}
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src={avatar}
            alt="User Avatar"
          />
          <div>
            <p className="app-sidebar__user-name text-white">Despina</p>
            <p className="app-sidebar__user-designation text-white">
              Admin Master
            </p>
          </div>
        </div>
        <ul className="app-menu">
          <li>
            <Link className="app-menu__item" to="/">
              <i className="app-menu__icon fa-light fa-gauge-high pr-1"></i>
              <span className="app-menu__label">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/user">
              <i className="app-menu__icon fa-sharp fa-light fa-users pr-1"></i>
              <span className="app-menu__label">All User</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/hobbies">
              <i className="app-menu__icon fa-light fa-sparkles pr-1"></i>
              <span className="app-menu__label">Hobbies</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/subscription">
              <i className="app-menu__icon fa-regular fa-money-bill-1"></i>
              <span className="app-menu__label">Subscription</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/cms-manage">
              <i className="app-menu__icon fa-light fa-laptop pr-1"></i>
              <span className="app-menu__label">Cms Manage</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/data-entry">
              <i className="app-menu__icon fa-light fa-file-chart-column pr-1"></i>
              <span className="app-menu__label">Data Entry</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/payment-management">
              <i className="app-menu__icon fa-light fa-credit-card"></i>
              <span className="app-menu__label">Payment Management</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/account-settings">
              <i className="app-menu__icon fa-light fa-gear pr-1"></i>
              <span className="app-menu__label">Account Settings</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/support">
              <i className="app-menu__icon fa-thin fa-circle-info"></i>
              <span className="app-menu__label">Support</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/faq">
              <i className="app-menu__icon fa-regular fa-message-question"></i>
              <span className="app-menu__label">FAQ</span>
            </Link>
          </li>
          <li>
            <Link className="app-menu__item" to="/login">
              <i className="app-menu__icon fa-light fa-right-from-bracket pr-1"></i>
              <span className="app-menu__label">Logout</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Header;
