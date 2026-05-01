import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
        
        console.log('🔍 Fetching Teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Teams API Response:', data);
        
        // Handle both paginated and plain array responses
        const teamsData = data.results || data || [];
        console.log('👥 Processed Teams Data:', teamsData);
        
        setTeams(teamsData);
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching teams:', error);
        setError(error.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <h2>👥 Teams</h2>
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
        <h2>👥 Teams</h2>
        <p className="text-muted">Manage and view all fitness teams</p>
      </div>
      
      {teams.length === 0 ? (
        <div className="card">
          <div className="card-body text-center empty-state">
            <div className="empty-state-icon">🤝</div>
            <h5 className="card-title">No Teams Found</h5>
            <p className="card-text text-muted">Create a team to get started with group fitness!</p>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Description</th>
                <th width="150">Members</th>
                <th width="150">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>
                    <span className="badge bg-primary">{team.id}</span>
                  </td>
                  <td>
                    <strong>{team.name}</strong>
                  </td>
                  <td>{team.description || '—'}</td>
                  <td>
                    <span className="badge bg-info">{team.members || 0} members</span>
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
          <i className="fas fa-plus"></i> Create New Team
        </button>
      </div>
    </div>
  );
}

export default Teams;
