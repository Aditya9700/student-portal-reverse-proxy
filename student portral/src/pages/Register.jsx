import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is already logged in
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Field existence validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    // Passwords match validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name: fullName.trim(),
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        // Redirect to Login page with registered state set to true
        navigate('/login', { state: { registered: true } });
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      // Fetch details from backend error response if available
      setError(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Network error. Please check if backend server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mesh-bg px-3 py-5">
      {/* Background blobs for premium glassmorphism mesh effect */}
      <div className="blob-1"></div>
      <div className="blob-2"></div>

      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="glass-card p-4 p-sm-5 border-0 shadow-lg">
              
              {/* Header/Logo Branding */}
              <div className="text-center mb-4">
                <div 
                  className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '70px', height: '70px' }}
                >
                  <i className="bi bi-person-plus-fill fs-1"></i>
                </div>
                <h2 className="fw-extrabold text-dark mb-1">Create Account</h2>
                <p className="text-secondary small">Join the Student Portal platform</p>
              </div>

              {error && (
                <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger d-flex align-items-center gap-2 py-2.5 rounded-3 mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div className="small fw-semibold">{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small">Full Name</label>
                  <div className="input-icon-wrapper">
                    <input
                      type="text"
                      className="form-control glass-input"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <i className="bi bi-person"></i>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small">Email Address</label>
                  <div className="input-icon-wrapper">
                    <input
                      type="email"
                      className="form-control glass-input"
                      placeholder="name@student.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <i className="bi bi-envelope"></i>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small">Password</label>
                  <div className="input-icon-wrapper">
                    <input
                      type="password"
                      className="form-control glass-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <i className="bi bi-lock"></i>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary small">Confirm Password</label>
                  <div className="input-icon-wrapper">
                    <input
                      type="password"
                      className="form-control glass-input"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <i className="bi bi-lock-fill"></i>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-modern w-100 py-3 mb-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registering...
                    </>
                  ) : (
                    'Register'
                  )}
                </button>
              </form>

              <div className="text-center mt-4 pt-2">
                <p className="mb-0 text-muted small">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary fw-bold text-decoration-none hover-underline">
                    Sign In here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
