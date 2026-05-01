import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
        
        console.log('🔍 Fetching Workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Workouts API Response:', data);
        
        // Handle both paginated and plain array responses
        const workoutsData = data.results || data || [];
        console.log('💪 Processed Workouts Data:', workoutsData);
        
        setWorkouts(workoutsData);
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching workouts:', error);
        setError(error.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading workouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <h2>💪 Workouts</h2>
        </div>
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  const getIntensityBadgeColor = (intensity) => {
    if (!intensity) return 'bg-secondary';
    const level = intensity.toLowerCase();
    if (level.includes('high') || level.includes('intense')) return 'bg-danger';
    if (level.includes('medium') || level.includes('moderate')) return 'bg-warning';
    if (level.includes('low') || level.includes('light')) return 'bg-success';
    return 'bg-info';
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>💪 Workouts</h2>
        <p className="text-muted">Browse and manage your workout routines</p>
      </div>
      
      {workouts.length === 0 ? (
        <div className="card">
          <div className="card-body text-center empty-state">
            <div className="empty-state-icon">🏋️</div>
            <h5 className="card-title">No Workouts Found</h5>
            <p className="card-text text-muted">Start creating your first workout routine!</p>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Workout Name</th>
                <th>Description</th>
                <th width="130">Duration</th>
                <th width="130">Intensity</th>
                <th width="150">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>
                    <span className="badge bg-primary">{workout.id}</span>
                  </td>
                  <td>
                    <strong>{workout.name}</strong>
                  </td>
                  <td>{workout.description || '—'}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {workout.duration || 0} min
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getIntensityBadgeColor(workout.intensity)}`}>
                      {workout.intensity || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info me-2">Start</button>
                    <button className="btn btn-sm btn-warning">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4">
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Create Workout
        </button>
      </div>
    </div>
  );
}

export default Workouts;
