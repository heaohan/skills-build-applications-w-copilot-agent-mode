import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
        
        console.log('🔍 Fetching Leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Leaderboard API Response:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardData = data.results || data || [];
        console.log('📊 Processed Leaderboard Data:', leaderboardData);
        
        setLeaderboard(leaderboardData);
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching leaderboard:', error);
        setError(error.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <h2>🏆 Leaderboard</h2>
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
        <h2>🏆 Leaderboard</h2>
        <p className="text-muted">Compete and see how you rank against other fitness enthusiasts</p>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="card">
          <div className="card-body text-center empty-state">
            <div className="empty-state-icon">🎯</div>
            <h5 className="card-title">No Leaderboard Data</h5>
            <p className="card-text text-muted">Be the first to join and create the leaderboard!</p>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th width="80">Rank</th>
                <th>User</th>
                <th width="150">Points</th>
                <th width="150">Total Score</th>
                <th width="120">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>
                    <div className="d-flex align-items-center">
                      {index === 0 && <span className="me-2">🥇</span>}
                      {index === 1 && <span className="me-2">🥈</span>}
                      {index === 2 && <span className="me-2">🥉</span>}
                      <span className="badge bg-primary">{index + 1}</span>
                    </div>
                  </td>
                  <td>
                    <strong>{entry.username || entry.user || 'Unknown'}</strong>
                  </td>
                  <td>
                    <span className="badge bg-success">{entry.score || entry.points || 0}</span>
                  </td>
                  <td>
                    <span className="badge bg-info">{entry.total_points || 0}</span>
                  </td>
                  <td>
                    <span className={`badge ${index < 3 ? 'bg-warning' : 'bg-secondary'}`}>
                      {index < 3 ? 'Top 3' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4">
        <button className="btn btn-primary me-2">Refresh</button>
        <button className="btn btn-success">Filter</button>
      </div>
    </div>
  );
}

export default Leaderboard;
