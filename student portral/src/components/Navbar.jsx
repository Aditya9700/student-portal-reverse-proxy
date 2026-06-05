import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

/**
 * Navbar component displayed on authenticated pages.
 * Provides navigation and logout handling.
 */
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth credentials and cached user details from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 transition-all">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white fs-4" to="/">
          <i className="bi bi-mortarboard-fill text-info fs-3"></i>
          <span>Student Portal</span>
        </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2 mt-3 mt-lg-0">
            <li className="nav-item w-100 w-lg-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded transition-all d-flex align-items-center justify-content-center justify-content-lg-start text-nowrap ${
                    isActive ? 'active bg-primary text-white fw-medium' : 'text-white-50 hover-bg'
                  }`
                }
              >
                <i className="bi bi-house-door me-2"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item w-100 w-lg-auto">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded transition-all d-flex align-items-center justify-content-center justify-content-lg-start text-nowrap ${
                    isActive ? 'active bg-primary text-white fw-medium' : 'text-white-50 hover-bg'
                  }`
                }
              >
                <i className="bi bi-person me-2"></i>
                <span>Profile</span>
              </NavLink>
            </li>
            <li className="nav-item ms-lg-3 w-100 w-lg-auto mt-2 mt-lg-0">
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger w-100 px-3 py-2 d-flex align-items-center justify-content-center gap-2 hover-shadow"
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
