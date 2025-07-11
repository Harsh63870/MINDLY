import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './Dashboard.css';
import Stars from "../components/Stars"; // Make sure to import

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMoodData(data.moodData || []);
        setAchievements(data.achievements || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner size="large" color="primary" />
        <p className="text-secondary mt-4">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container fade-in">
      <Stars />
      <div className="planet-orbit">
        <div className="planet-glossy"></div>
        <div className="planet-shadow"></div>
      </div>
      <div className="container">
        <div className="dashboard-header">
          <h1 className="text-3xl font-bold">Welcome back, {user?.username}!</h1>
          <p className="text-secondary text-lg">How are you feeling today?</p>
        </div>

        <div className="dashboard-grid">
          {/* Quick Mood Check */}
          <Card className="mood-quick-check" shadow="medium" padding="large">
            <h2 className="text-xl font-semibold mb-4">Quick Mood Check</h2>
            <div className="mood-options">
              {['😊', '😐', '😔', '', '😴'].map((emoji, index) => (
                <button
                  key={index}
                  className="mood-option"
                  onClick={() => {/* Handle mood selection */}}
                >
                  <span className="mood-emoji">{emoji}</span>
                </button>
              ))}
            </div>
            <Button variant="primary" className="mt-4 w-full">
              Track My Mood
            </Button>
          </Card>

          {}
          <Card className="recent-moods" shadow="medium" padding="large">
            <h2 className="text-xl font-semibold mb-4">Recent Moods</h2>
            {moodData.length > 0 ? (
              <div className="mood-history">
                {moodData.slice(0, 5).map((mood, index) => (
                  <div key={index} className="mood-entry">
                    <span className="mood-emoji">{mood.emoji}</span>
                    <div className="mood-details">
                      <span className="mood-score">{mood.score}/10</span>
                      <span className="mood-date">{new Date(mood.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary">No mood data yet. Start tracking your mood!</p>
            )}
          </Card>

          {}
          <Card className="achievements" shadow="medium" padding="large">
            <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
            {achievements.length > 0 ? (
              <div className="achievements-list">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <span className="achievement-icon">🏆</span>
                    <div className="achievement-details">
                      <span className="achievement-title">{achievement.title}</span>
                      <span className="achievement-desc">{achievement.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary">Complete tasks to earn achievements!</p>
            )}
          </Card>

          {}
          <Card className="quick-actions" shadow="medium" padding="large">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="actions-grid">
              <Button variant="secondary" className="action-btn">
                Take Questionnaire
              </Button>
              <Button variant="secondary" className="action-btn">
                View Progress
              </Button>
              <Button variant="secondary" className="action-btn">
                Set Goals
              </Button>
              <Button variant="secondary" className="action-btn">
                Get Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;