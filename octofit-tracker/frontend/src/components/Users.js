import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/users/`;
        
        console.log('🔍 Fetching Users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Users API Response:', data);
        
        // Handle both paginated and plain array responses
        const usersData = data.results || data || [];
        console.log('👤 Processed Users Data:', usersData);
        
        setUsers(usersData);
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching users:', error);
        setError(error.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="page-header">
          <h2>👤 Users</h2>
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
        <h2>👤 Users</h2>
        <p className="text-muted">View and manage community members</p>
      </div>
      
      {users.length === 0 ? (
        <div className="card">
          <div className="card-body text-center empty-state">
            <div className="empty-state-icon">😔</div>
            <h5 className="card-title">No Users Found</h5>
            <p className="card-text text-muted">Invite users to join the community!</p>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Full Name</th>
                <th width="150">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="badge bg-primary">{user.id}</span>
                  </td>
                  <td>
                    <strong>{user.username}</strong>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info me-2">Profile</button>
                    <button className="btn btn-sm btn-warning">Message</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4">
        <button className="btn btn-primary">
          <i className="fas fa-user-plus"></i> Add User
        </button>
      </div>
    </div>
  );
}

export default Users;
