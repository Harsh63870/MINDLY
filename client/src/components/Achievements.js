import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import LoadingSpinner from './ui/LoadingSpinner';
import './Achievements.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    unlocked: 0,
    progress: 0
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/achievements', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
        setStats({
          total: 10, // Total possible achievements
          unlocked: data.length,
          progress: Math.round((data.length / 10) * 100)
        });
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const allAchievements = [
    {
      id: 'first-step',
      title: 'First Step',
      description: 'Tracked your first mood entry',
      icon: '🌟',
      category: 'milestone',
      requirement: 'Track 1 mood entry'
    },
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: 'Tracked your mood for 7 consecutive days',
      icon: '🔥',
      category: 'streak',
      requirement: '7 day streak'
    },
    {
      id: 'mood-master',
      title: 'Mood Master',
      description: 'Tracked 30 mood entries',
      icon: '👑',
      category: 'milestone',
      requirement: '30 entries'
    },
    {
      id: 'consistency-king',
      title: 'Consistency King',
      description: 'Tracked your mood for 30 consecutive days',
      icon: '⚡',
      category: 'streak',
      requirement: '30 day streak'
    },
    {
      id: 'self-awareness',
      title: 'Self Awareness',
      description: 'Added notes to 10 mood entries',
      icon: '🧠',
      category: 'milestone',
      requirement: '10 entries with notes'
    },
    {
      id: 'activity-explorer',
      title: 'Activity Explorer',
      description: 'Tracked activities with 20 mood entries',
      icon: '🎯',
      category: 'milestone',
      requirement: '20 entries with activities'
    },
    {
      id: 'positive-vibes',
      title: 'Positive Vibes',
      description: 'Had 10 consecutive positive mood entries (score 7+)',
      icon: '🌈',
      category: 'special',
      requirement: '10 positive entries in a row'
    },
    {
      id: 'resilience',
      title: 'Resilience',
      description: 'Tracked through difficult times (5 low mood entries)',
      icon: '💪',
      category: 'special',
      requirement: '5 low mood entries'
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness',
      description: 'Tracked mood at the same time for 14 days',
      icon: '🧘',
      category: 'streak',
      requirement: '14 days same time'
    },
    {
      id: 'lifetime',
      title: 'Lifetime Achievement',
      description: 'Tracked mood for 100 days',
      icon: '🏆',
      category: 'milestone',
      requirement: '100 entries'
    }
  ];

  if (loading) {
    return (
      <div className="achievements-loading">
        <LoadingSpinner size="large" color="primary" />
        <p>Loading your achievements...</p>
      </div>
    );
  }

  return (
    <div className="achievements-container">
      <div className="container">
        <div className="achievements-header">
          <h1>Your Achievements</h1>
          <p>Celebrate your mental health journey milestones</p>
        </div>

        <Card className="achievements-stats" shadow="medium" padding="large">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{stats.unlocked}</div>
              <div className="stat-label">Unlocked</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.progress}%</div>
              <div className="stat-label">Progress</div>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${stats.progress}%` }}
            ></div>
          </div>
        </Card>

        <div className="achievements-grid">
          {allAchievements.map((achievement) => {
            const isUnlocked = achievements.some(a => a.title === achievement.title);
            const unlockedAchievement = achievements.find(a => a.title === achievement.title);
            
            return (
              <Card 
                key={achievement.id}
                className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                shadow="medium" 
                padding="large"
              >
                <div className="achievement-icon">
                  {isUnlocked ? achievement.icon : '🔒'}
                </div>
                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                  <div className="achievement-requirement">
                    {achievement.requirement}
                  </div>
                  {isUnlocked && unlockedAchievement && (
                    <div className="achievement-date">
                      Unlocked: {new Date(unlockedAchievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {isUnlocked && (
                  <div className="achievement-badge">✓</div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;