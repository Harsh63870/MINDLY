import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const userObj = JSON.parse(userData);
        setUser(userObj);
        setFormData({
          username: userObj.username,
          email: userObj.email
        });
      }

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/mood/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = { ...user, ...formData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <LoadingSpinner size="large" color="primary" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-header">
          <h1>Your Profile</h1>
          <p>Manage your account and view your progress</p>
        </div>

        <div className="profile-content">
          <Card className="profile-info-card" shadow="medium" padding="large">
            <div className="profile-header-section">
              <div className="profile-avatar">
                <span className="avatar-text">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="profile-info">
                <h2>{user?.username}</h2>
                <p>{user?.email}</p>
                <p className="member-since">
                  Member since {new Date().toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            {editing && (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            )}
          </Card>

          <Card className="profile-stats-card" shadow="medium" padding="large">
            <h2>Your Mental Health Journey</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{stats.totalEntries || 0}</div>
                <div className="stat-label">Mood Entries</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {stats.averageScore ? Math.round(stats.averageScore * 10) / 10 : 0}
                </div>
                <div className="stat-label">Average Mood Score</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {stats.weeklyMoods ? stats.weeklyMoods.length : 0}
                </div>
                <div className="stat-label">This Week</div>
              </div>
            </div>
          </Card>

          <Card className="profile-actions-card" shadow="medium" padding="large">
            <h2>Account Actions</h2>
            <div className="actions-grid">
              <Button variant="secondary" className="action-btn">
                Export Data
              </Button>
              <Button variant="secondary" className="action-btn">
                Privacy Settings
              </Button>
              <Button variant="secondary" className="action-btn">
                Notification Preferences
              </Button>
              <Button 
                variant="danger" 
                className="action-btn"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;