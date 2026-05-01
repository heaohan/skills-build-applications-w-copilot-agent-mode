import React from 'react';

function Home() {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">🐙 Welcome to OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities and compete with your team on the leaderboard!</p>
        <hr className="my-4" />
        <p className="mb-4">
          OctoFit Tracker is your ultimate fitness companion. Monitor your workout progress, 
          log your activities, manage your team, and climb the competitive leaderboard.
        </p>
        <div className="row mt-5">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">📊 Track Activities</h5>
                <p className="card-text">Log and monitor all your fitness activities in one place.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">💪 Manage Workouts</h5>
                <p className="card-text">Create and manage custom workout routines tailored to you.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">🏆 Compete & Win</h5>
                <p className="card-text">Join teams and compete on the leaderboard with others.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">👥 Team Management</h5>
                <p className="card-text">Create teams and collaborate with fellow fitness enthusiasts.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">📈 Progress Tracking</h5>
                <p className="card-text">Visualize your fitness journey and celebrate milestones.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">👤 User Profiles</h5>
                <p className="card-text">View detailed profiles and connect with other users.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
