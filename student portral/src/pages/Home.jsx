import React from 'react';

const Home = () => {
  // Retrieve the logged-in user details from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { name: 'Student' };

  return (
    <div className="container py-5">
      {/* Header section with fade-in animation */}
      <div className="row mb-5">
        <div className="col-12 text-center text-md-start">
          <h1 className="fw-extrabold text-dark mb-2">Welcome, {user.name}</h1>
          <p className="text-secondary fs-5">Here is your current academic overview and latest announcements.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100 rounded-3 card-hover border-start border-primary border-4">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted fw-bold text-uppercase mb-1 small tracking-wide">Total Students</p>
                <h2 className="display-6 fw-bold mb-0">125</h2>
              </div>
              <div className="bg-primary-subtle text-primary rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-people-fill fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100 rounded-3 card-hover border-start border-success border-4">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted fw-bold text-uppercase mb-1 small tracking-wide">Courses Enrolled</p>
                <h2 className="display-6 fw-bold mb-0">8</h2>
              </div>
              <div className="bg-success-subtle text-success rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-journal-bookmark-fill fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100 rounded-3 card-hover border-start border-warning border-4">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted fw-bold text-uppercase mb-1 small tracking-wide">Assignments</p>
                <h2 className="display-6 fw-bold mb-0">15</h2>
              </div>
              <div className="bg-warning-subtle text-warning rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-file-earmark-text-fill fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements section */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-dark text-white p-3 d-flex align-items-center gap-2 rounded-top-3">
              <i className="bi bi-megaphone-fill text-warning fs-5"></i>
              <h5 className="mb-0 fw-bold">Latest Announcements</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                
                <div className="list-group-item p-3 d-flex align-items-start gap-3 border-0 border-bottom border-light">
                  <span className="badge bg-danger rounded-pill px-2.5 py-1.5 mt-1">Urgent</span>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold text-dark mb-1">AI Assignment Submission Due</h6>
                    <p className="text-muted mb-0 small">Please upload your neural network project folders on the portal before Friday 11:59 PM.</p>
                  </div>
                  <small className="text-muted text-nowrap">Today</small>
                </div>

                <div className="list-group-item p-3 d-flex align-items-start gap-3 border-0 border-bottom border-light">
                  <span className="badge bg-warning text-dark rounded-pill px-2.5 py-1.5 mt-1">Important</span>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold text-dark mb-1">Web Technology Viva Next Week</h6>
                    <p className="text-muted mb-0 small">External examiners will evaluate JavaScript projects in Lab 3. Schedules will be shared soon.</p>
                  </div>
                  <small className="text-muted text-nowrap">Yesterday</small>
                </div>

                <div className="list-group-item p-3 d-flex align-items-start gap-3 border-0">
                  <span className="badge bg-info text-dark rounded-pill px-2.5 py-1.5 mt-1">Notice</span>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold text-dark mb-1">Placement Drive Registration Open</h6>
                    <p className="text-muted mb-0 small">Registrations for TCS and Infosys campus drives are active. Complete your registration by this weekend.</p>
                  </div>
                  <small className="text-muted text-nowrap">2 days ago</small>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
