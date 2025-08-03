import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import './MoodTracker.css';

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const moodOptions = [
    { emoji: '😊', label: 'Happy', score: 9 },
    { emoji: '😌', label: 'Calm', score: 8 },
    { emoji: '😐', label: 'Neutral', score: 5 },
    { emoji: '😔', label: 'Sad', score: 3 },
    { emoji: '��', label: 'Very Sad', score: 1 },
    { emoji: '��', label: 'Stressed', score: 4 },
    { emoji: '😴', label: 'Tired', score: 6 },
    { emoji: '��', label: 'Grateful', score: 10 }
  ];

  const activityOptions = [
    'Exercise', 'Reading', 'Music', 'Socializing', 
    'Work', 'Sleep', 'Eating', 'Meditation', 
    'Gaming', 'Nature', 'Creativity', 'Learning'
  ];

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
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
  };

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

        <div className="mood-content">
          <Card className="mood-input-card" shadow="medium" padding="large">
            <h2>Select Your Mood</h2>
            <div className="mood-options">
              {moodOptions.map((mood, index) => (
                <button
                  key={index}
                  className={`mood-option ${currentMood?.label === mood.label ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect(mood)}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
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
                {moodHistory.slice(0, 7).map((entry, index) => (
                  <div key={index} className="mood-entry">
                    <div className="mood-entry-header">
                      <span className="mood-score">{entry.score}/10</span>
                      <span className="mood-date">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mood-entry-details">
                      <span className="mood-text">{entry.mood}</span>
                      {entry.notes && <p className="mood-notes-text">{entry.notes}</p>}
                    </div>
                  </div>
                ))}
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