import React, { useState, useEffect, useCallback } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import MoodAnalytics from './MoodAnalytics';
import './MoodTracker.css';

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [stats, setStats] = useState({
    totalEntries: 0,
    averageScore: 0,
    weeklyAverage: 0,
    monthlyAverage: 0,
    moodTrend: 'stable',
    bestDay: '',
    worstDay: ''
  });

  const moodOptions = [
    { emoji: '😊', label: 'Happy', score: 9, color: '#43e97b' },
    { emoji: '😌', label: 'Calm', score: 8, color: '#38f9d7' },
    { emoji: '😐', label: 'Neutral', score: 5, color: '#ffa502' },
    { emoji: '😔', label: 'Sad', score: 3, color: '#ff6348' },
    { emoji: '😔', label: 'Very Sad', score: 1, color: '#ff4757' },
    { emoji: '😔', label: 'Stressed', score: 4, color: '#ff9ff3' },
    { emoji: '😴', label: 'Tired', score: 6, color: '#54a0ff' },
    { emoji: '😊', label: 'Grateful', score: 10, color: '#00d2d3' }
  ];

  const activityOptions = [
    'Exercise', 'Reading', 'Music', 'Socializing', 
    'Work', 'Sleep', 'Eating', 'Meditation', 
    'Gaming', 'Nature', 'Creativity', 'Learning'
  ];

  // Use useCallback to memoize the calculateStats function
  const calculateStats = useCallback(() => {
    if (moodHistory.length === 0) return;

    const totalEntries = moodHistory.length;
    const totalScore = moodHistory.reduce((sum, entry) => sum + entry.score, 0);
    const averageScore = totalScore / totalEntries;

    // Weekly average (last 7 entries)
    const weeklyEntries = moodHistory.slice(0, 7);
    const weeklyScore = weeklyEntries.reduce((sum, entry) => sum + entry.score, 0);
    const weeklyAverage = weeklyEntries.length > 0 ? weeklyScore / weeklyEntries.length : 0;

    // Monthly average (last 30 entries)
    const monthlyEntries = moodHistory.slice(0, 30);
    const monthlyScore = monthlyEntries.reduce((sum, entry) => sum + entry.score, 0);
    const monthlyAverage = monthlyEntries.length > 0 ? monthlyScore / monthlyEntries.length : 0;

    // Mood trend
    let moodTrend = 'stable';
    if (weeklyAverage > averageScore + 1) moodTrend = 'improving';
    else if (weeklyAverage < averageScore - 1) moodTrend = 'declining';

    // Best and worst days
    const bestEntry = moodHistory.reduce((best, current) => 
      current.score > best.score ? current : best
    );
    const worstEntry = moodHistory.reduce((worst, current) => 
      current.score < worst.score ? current : worst
    );

    setStats({
      totalEntries,
      averageScore: Math.round(averageScore * 10) / 10,
      weeklyAverage: Math.round(weeklyAverage * 10) / 10,
      monthlyAverage: Math.round(monthlyAverage * 10) / 10,
      moodTrend,
      bestDay: bestEntry ? new Date(bestEntry.createdAt).toLocaleDateString() : '',
      worstDay: worstEntry ? new Date(worstEntry.createdAt).toLocaleDateString() : ''
    });
  }, [moodHistory]);

  const fetchMoodHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/mood/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMoodHistory(data);
      }
    } catch (error) {
      console.error('Error fetching mood history:', error);
    }
  }, []);

  useEffect(() => {
    fetchMoodHistory();
  }, [fetchMoodHistory]);

  useEffect(() => {
    if (moodHistory.length > 0) {
      calculateStats();
    }
  }, [moodHistory, calculateStats]);

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
  };

  const handleActivityToggle = (activity) => {
    setActivities(prev => 
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    if (!currentMood) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/mood/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mood: currentMood.label,
          score: currentMood.score,
          notes,
          activities
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setCurrentMood(null);
        setNotes('');
        setActivities([]);
        fetchMoodHistory();
        
        // Check for achievements
        await fetch('http://localhost:5000/api/achievements/check', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Error submitting mood:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return '➡️';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  const getMoodTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return '#43e97b';
      case 'declining': return '#ff4757';
      default: return '#ffa502';
    }
  };

  if (submitted) {
    return (
      <div className="mood-tracker-container">
        <Card className="mood-success" shadow="medium" padding="large">
          <div className="success-content">
            <div className="success-icon">✨</div>
            <h2>Mood Recorded!</h2>
            <p>Thank you for checking in with yourself today.</p>
            <Button 
              variant="primary" 
              onClick={() => setSubmitted(false)}
            >
              Track Another Mood
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mood-tracker-container">
      <div className="container">
        <div className="mood-header">
          <h1>How are you feeling today?</h1>
          <p>Take a moment to check in with yourself</p>
        </div>

        {/* Mood Statistics Overview */}
        {moodHistory.length > 0 && (
          <Card className="mood-stats-overview" shadow="medium" padding="large">
            <div className="stats-header">
              <h2>Your Mood Overview</h2>
              <Button 
                variant="secondary" 
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </Button>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalEntries}</div>
                  <div className="stat-label">Total Entries</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.averageScore}</div>
                  <div className="stat-label">Average Score</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.weeklyAverage}</div>
                  <div className="stat-label">Weekly Average</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.monthlyAverage}</div>
                  <div className="stat-label">Monthly Average</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">{getMoodTrendIcon(stats.moodTrend)}</div>
                <div className="stat-content">
                  <div className="stat-number" style={{ color: getMoodTrendColor(stats.moodTrend) }}>
                    {stats.moodTrend.charAt(0).toUpperCase() + stats.moodTrend.slice(1)}
                  </div>
                  <div className="stat-label">Mood Trend</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.bestDay}</div>
                  <div className="stat-label">Best Day</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Analytics Section */}
        {showAnalytics && moodHistory.length > 0 && (
          <MoodAnalytics moodHistory={moodHistory} />
        )}

        <div className="mood-content">
          <Card className="mood-input-card" shadow="medium" padding="large">
            <h2>Select Your Mood</h2>
            <div className="mood-options">
              {moodOptions.map((mood, index) => (
                <button
                  key={index}
                  className={`mood-option ${currentMood?.label === mood.label ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect(mood)}
                  style={{
                    borderColor: currentMood?.label === mood.label ? mood.color : '#333'
                  }}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
                  <span className="mood-score">{mood.score}/10</span>
                </button>
              ))}
            </div>

            {currentMood && (
              <>
                <div className="mood-notes">
                  <h3>Add Notes (Optional)</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How are you feeling? What's on your mind?"
                    rows="3"
                  />
                </div>

                <div className="mood-activities">
                  <h3>What have you been doing?</h3>
                  <div className="activity-options">
                    {activityOptions.map((activity, index) => (
                      <button
                        key={index}
                        className={`activity-option ${activities.includes(activity) ? 'selected' : ''}`}
                        onClick={() => handleActivityToggle(activity)}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="large"
                  className="submit-mood-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="small" color="primary" />
                      Recording Mood...
                    </>
                  ) : (
                    'Record My Mood'
                  )}
                </Button>
              </>
            )}
          </Card>

          <Card className="mood-history-card" shadow="medium" padding="large">
            <h2>Recent Mood History</h2>
            {moodHistory.length > 0 ? (
              <div className="mood-history">
                {moodHistory.slice(0, 7).map((entry, index) => {
                  const moodOption = moodOptions.find(m => m.label === entry.mood);
                  return (
                    <div key={index} className="mood-entry">
                      <div className="mood-entry-header">
                        <span className="mood-score" style={{ color: moodOption?.color }}>
                          {entry.score}/10
                        </span>
                        <span className="mood-date">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mood-entry-details">
                        <span className="mood-text">{entry.mood}</span>
                        {entry.notes && <p className="mood-notes-text">{entry.notes}</p>}
                        {entry.activities && entry.activities.length > 0 && (
                          <div className="mood-activities-display">
                            <span className="activities-label">Activities:</span>
                            <div className="activities-tags">
                              {entry.activities.map((activity, idx) => (
                                <span key={idx} className="activity-tag">{activity}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-mood-data">No mood data yet. Start tracking your mood!</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;