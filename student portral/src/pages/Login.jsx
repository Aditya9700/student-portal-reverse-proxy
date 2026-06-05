import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If redirected from successful registration page
    if (location.state && location.state.registered) {
      setSuccessMessage('Registration successful! Please login with your credentials.');
      window.history.replaceState({}, document.title);
    }

    // Redirect to home if user is already logged in
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        // Store token and user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect to Home dashboard
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
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
                  <i className="bi bi-mortarboard-fill fs-1"></i>
                </div>
                <h2 className="fw-extrabold text-dark mb-1">Student Portal</h2>
                <p className="text-secondary small">Access your academic dashboard</p>
              </div>

              {error && (
                <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger d-flex align-items-center gap-2 py-2.5 rounded-3 mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div className="small fw-semibold">{error}</div>
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success border-0 bg-success bg-opacity-10 text-success d-flex align-items-center gap-2 py-2.5 rounded-3 mb-4" role="alert">
                  <i className="bi bi-check-circle-fill"></i>
                  <div className="small fw-semibold">{successMessage}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small">Email Address</label>
                  <div className="input-icon-wrapper">
                    <input
                      type="email"
                      className="form-control glass-input"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <i className="bi bi-envelope"></i>
                  </div>
                </div>

                <div className="mb-4">
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

                <button
                  type="submit"
                  className="btn btn-modern w-100 py-3 mb-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="text-center mt-4 pt-2">
                <p className="mb-0 text-muted small">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary fw-bold text-decoration-none hover-underline">
                    Create account
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

export default Login;
