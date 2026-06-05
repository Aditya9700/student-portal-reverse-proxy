import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError(response.data.message || 'Failed to retrieve profile details.');
        }
      } catch (err) {
        console.error('Fetch profile error:', err);
        setError(
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Network error. Failed to retrieve profile from backend.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Compute name initials for the avatar circle (e.g., John Doe -> JD)
  const getInitials = (name) => {
    if (!name) return 'SP';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            {/* Header backdrop */}
            <div className="bg-primary p-5 text-center position-relative">
              <div
                className="position-absolute start-50 translate-middle-x"
                style={{ bottom: '-50px' }}
              >
                <div
                  className="bg-white rounded-circle p-1 shadow-sm d-flex align-items-center justify-content-center"
                  style={{ width: '100px', height: '100px' }}
                >
                  <div
                    className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-2"
                    style={{ width: '88px', height: '88px' }}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : user ? (
                      getInitials(user.name)
                    ) : (
                      '?'
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info Body */}
            <div className="card-body pt-5 px-4 pb-4 mt-3">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading profile...</span>
                  </div>
                  <p className="text-muted mt-3 mb-0 small">Retrieving student records...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger d-inline-flex align-items-center gap-2 py-2.5 px-4 rounded-3 mb-4" role="alert">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <div className="small fw-semibold">{error}</div>
                  </div>
                  <div>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="btn btn-sm btn-outline-primary px-3 rounded-pill"
                    >
                      <i className="bi bi-arrow-clockwise me-1"></i> Retry
                    </button>
                  </div>
                </div>
              ) : user ? (
                <div className="text-center">
                  <h4 className="fw-bold mb-1">{user.name}</h4>
                  <p className="text-muted mb-4">Student Portal Member</p>
                  
                  <hr className="my-4 text-black-50" />

                  <div className="row text-start g-3 px-2">
                    <div className="col-12 col-sm-6">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <span className="text-muted d-block small fw-bold text-uppercase mb-1">Full Name</span>
                        <span className="fw-semibold text-dark text-break">{user.name}</span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <span className="text-muted d-block small fw-bold text-uppercase mb-1">Email Address</span>
                        <span className="fw-semibold text-dark text-break">{user.email}</span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <span className="text-muted d-block small fw-bold text-uppercase mb-1">Role / Status</span>
                        <div>
                          <span className="badge bg-success-subtle text-success fs-7 px-3 py-2 mt-1">Student</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <span className="text-muted d-block small fw-bold text-uppercase mb-1">User ID</span>
                        <span className="fw-semibold text-dark text-break small font-monospace">{user.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 text-center">
                    <p className="text-muted small mb-0">
                      <i className="bi bi-shield-fill-check text-success me-1"></i>
                      Verified account session
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
