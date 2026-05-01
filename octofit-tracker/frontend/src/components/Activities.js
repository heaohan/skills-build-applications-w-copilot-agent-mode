import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
        
        console.log('🔍 Fetching Activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Activities API Response:', data);
        
        // Handle both paginated and plain array responses
        const activitiesData = data.results || data || [];
        console.log('📋 Processed Activities Data:', activitiesData);
        
        setActivities(activitiesData);
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching activities:', error);
        setError(error.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <h2>📊 Activities</h2>
        </div>
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>📊 Activities</h2>
        <p className="text-muted">View and manage all your fitness activities</p>
      </div>
      
      {activities.length === 0 ? (
        <div className="card">
          <div className="card-body text-center empty-state">
            <div className="empty-state-icon">📭</div>
            <h5 className="card-title">No Activities Found</h5>
            <p className="card-text text-muted">Start by logging your first activity!</p>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Activity Name</th>
                <th>Description</th>
                <th>Calories Burned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <span className="badge bg-primary">{activity.id}</span>
                  </td>
                  <td>
                    <strong>{activity.name}</strong>
                  </td>
                  <td>{activity.description || '—'}</td>
                  <td>
                    <span className="badge bg-success">{activity.calories || 0} cal</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info me-2">View</button>
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
          <i className="fas fa-plus"></i> Add New Activity
        </button>
      </div>
    </div>
  );
}

export default Activities;
