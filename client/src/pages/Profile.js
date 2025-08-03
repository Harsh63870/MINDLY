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
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

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
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  // Export Data Function
  const handleExportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/mood/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const moodData = await response.json();
        
        // Create CSV content
        const csvContent = [
          ['Date', 'Mood', 'Score', 'Notes', 'Activities'],
          ...moodData.map(entry => [
            new Date(entry.createdAt).toLocaleDateString(),
            entry.mood,
            entry.score,
            entry.notes || '',
            entry.activities ? entry.activities.join(', ') : ''
          ])
        ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mindly-mood-data-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        setShowExportModal(false);
        alert('Data exported successfully!');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  // Privacy Settings Function
  const handlePrivacySettings = () => {
    setShowPrivacyModal(true);
  };

  // Notification Preferences Function
  const handleNotificationPreferences = () => {
    setShowNotificationModal(true);
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
              <Button 
                variant="secondary" 
                className="action-btn"
                onClick={() => setShowExportModal(true)}
              >
                Export Data
              </Button>
              <Button 
                variant="secondary" 
                className="action-btn"
                onClick={handlePrivacySettings}
              >
                Privacy Settings
              </Button>
              <Button 
                variant="secondary" 
                className="action-btn"
                onClick={handleNotificationPreferences}
              >
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

      {/* Export Data Modal */}
      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Export Your Data</h3>
            <p>This will download all your mood tracking data as a CSV file.</p>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowExportModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleExportData}>
                Export Data
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showPrivacyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Privacy Settings</h3>
            <div className="privacy-options">
              <div className="privacy-option">
                <label>
                  <input type="checkbox" defaultChecked />
                  Share anonymous data for research
                </label>
                <p>Help improve mental health research (no personal information shared)</p>
              </div>
              <div className="privacy-option">
                <label>
                  <input type="checkbox" defaultChecked />
                  Allow data analytics
                </label>
                <p>Help us improve the app with usage analytics</p>
              </div>
              <div className="privacy-option">
                <label>
                  <input type="checkbox" />
                  Public profile
                </label>
                <p>Allow other users to see your achievements (username only)</p>
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowPrivacyModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => {
                alert('Privacy settings saved!');
                setShowPrivacyModal(false);
              }}>
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Preferences Modal */}
      {showNotificationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Notification Preferences</h3>
            <div className="notification-options">
              <div className="notification-option">
                <label>
                  <input type="checkbox" defaultChecked />
                  Daily mood check reminders
                </label>
                <p>Get reminded to track your mood daily</p>
              </div>
              <div className="notification-option">
                <label>
                  <input type="checkbox" defaultChecked />
                  Achievement notifications
                </label>
                <p>Get notified when you earn new achievements</p>
              </div>
              <div className="notification-option">
                <label>
                  <input type="checkbox" />
                  Weekly progress reports
                </label>
                <p>Receive weekly summaries of your mood journey</p>
              </div>
              <div className="notification-option">
                <label>
                  <input type="checkbox" />
                  Motivational messages
                </label>
                <p>Receive encouraging messages and tips</p>
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowNotificationModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => {
                alert('Notification preferences saved!');
                setShowNotificationModal(false);
              }}>
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;