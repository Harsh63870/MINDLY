import React, { useState, useEffect, useCallback } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import './GamificationSystem.css';

const GamificationSystem = ({ userStats, onLevelUp }) => {
  const [userLevel, setUserLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [streak] = useState(0);
  const [points, setPoints] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);

  // Calculate level and experience
  const calculateLevelAndExperience = useCallback(() => {
    const totalEntries = userStats.totalEntries || 0;
    const avgScore = userStats.averageScore || 0;
    
    // Base experience from entries
    let exp = totalEntries * 10;
    
    // Bonus experience for high scores
    if (avgScore >= 8) exp += totalEntries * 5;
    if (avgScore >= 9) exp += totalEntries * 10;
    if (avgScore == 10) exp += totalEntries *10;
    // Streak bonus
    const streakBonus = Math.min(streak * 5, 50);
    exp += streakBonus;
    
    // Calculate level (every 100 exp = 1 level)
    const newLevel = Math.floor(exp / 100) + 1;
    const currentLevelExp = exp % 100;
    
    setExperience(currentLevelExp);
    setPoints(exp);
    
    if (newLevel > userLevel) {
      setUserLevel(newLevel);
      setShowLevelUp(true);
      onLevelUp && onLevelUp(newLevel);
    }
  }, [userStats, streak, userLevel, onLevelUp]);
  useEffect(() => {
    calculateLevelAndExperience();
  }, [calculateLevelAndExperience]);


  // Daily challenges
  const dailyChallenges = [
    {
      id: 1,
      title: "Mood Master",
      description: "Track your mood for 7 consecutive days",
      progress: Math.min(streak, 7),
      target: 7,
      reward: { type: 'points', amount: 50, icon: '🌟' },
      completed: streak >= 7
    },
    {
      id: 2,
      title: "Positive Vibes",
      description: "Have 5 consecutive positive mood entries (score 7+)",
      progress: 0, // Will be calculated
      target: 5,
      reward: { type: 'points', amount: 30, icon: '😊' },
      completed: false
    },
    {
      id: 3,
      title: "Self Reflection",
      description: "Add notes to 10 mood entries",
      progress: 0, // Will be calculated
      target: 10,
      reward: { type: 'points', amount: 25, icon: '📝' },
      completed: false
    },
    {
      id: 4,
      title: "Activity Explorer",
      description: "Track activities with 15 mood entries",
      progress: 0, // Will be calculated
      target: 15,
      reward: { type: 'points', amount: 40, icon: '🎯' },
      completed: false
    }
  ];

  // Weekly challenges
  const weeklyChallenges = [
    {
      id: 5,
      title: "Consistency King",
      description: "Track mood every day this week",
      progress: Math.min(streak, 7),
      target: 7,
      reward: { type: 'badge', name: 'Consistency King', icon: '👑' },
      completed: streak >= 7
    },
    {
      id: 6,
      title: "Mood Analyst",
      description: "Achieve an average mood score of 8+ this week",
      progress: 0,
      target: 8,
      reward: { type: 'badge', name: 'Mood Analyst', icon: '📊' },
      completed: false
    }
  ];

  // Available rewards
  const availableRewards = [
    {
      id: 1,
      name: "Mood Tracker Pro",
      description: "Unlock advanced analytics and insights",
      cost: 100,
      icon: "📈",
      unlocked: points >= 100
    },
    {
      id: 2,
      name: "Custom Themes",
      description: "Unlock beautiful custom themes",
      cost: 150,
      icon: "🎨",
      unlocked: points >= 150
    },
    {
      id: 3,
      name: "Export Data",
      description: "Download your mood data anytime",
      cost: 200,
      icon: "📤",
      unlocked: points >= 200
    },
    {
      id: 4,
      name: "Priority Support",
      description: "Get priority customer support",
      cost: 300,
      icon: "🎧",
      unlocked: points >= 300
    }
  ];
  const claimReward = (reward) => {
    if (points >= reward.cost) {
      setPoints(prev => prev - reward.cost);
      setCurrentReward(reward);
      setShowReward(true);
    }
  };
 

  const getLevelTitle = (level) => {
    const titles = [
      "Mood Explorer", "Feeling Finder", "Emotion Tracker", 
      "Mindful Observer", "Wellness Warrior", "Mental Health Hero",
      "Peace Seeker", "Balance Master", "Zen Guardian", "Mind Master"
    ];
    return titles[Math.min(level - 1, titles.length - 1)];
  };

  const getLevelColor = (level) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];
    return colors[Math.min(level - 1, colors.length - 1)];
  };

  return (
    <div className="gamification-system">
      {/* Level and Progress */}
      <Card className="level-card" shadow="medium" padding="large">
        <div className="level-header">
          <div className="level-info">
            <div className="level-badge" style={{ backgroundColor: getLevelColor(userLevel) }}>
              <span className="level-number">{userLevel}</span>
            </div>
            <div className="level-details">
              <h3>{getLevelTitle(userLevel)}</h3>
              <p>Level {userLevel} • {points} Points</p>
            </div>
          </div>
          <div className="streak-info">
            <div className="streak-badge">
              <span className="streak-icon">🔥</span>
              <span className="streak-count">{streak}</span>
            </div>
            <p>Day Streak</p>
          </div>
        </div>
        
        <div className="experience-bar">
          <div className="exp-progress">
            <div 
              className="exp-fill" 
              style={{ 
                width: `${experience}%`,
                backgroundColor: getLevelColor(userLevel)
              }}
            ></div>
          </div>
          <span className="exp-text">{experience}/100 XP</span>
        </div>
      </Card>

      {/* Daily Challenges */}
      <Card className="challenges-card" shadow="medium" padding="large">
        <h3>Daily Challenges</h3>
        <div className="challenges-grid">
          {dailyChallenges.map(challenge => (
            <div key={challenge.id} className={`challenge-item ${challenge.completed ? 'completed' : ''}`}>
              <div className="challenge-header">
                <h4>{challenge.title}</h4>
                {challenge.completed && <span className="completed-icon">✅</span>}
              </div>
              <p>{challenge.description}</p>
              <div className="challenge-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">{challenge.progress}/{challenge.target}</span>
              </div>
              {challenge.completed && (
                <div className="reward-info">
                  <span className="reward-icon">{challenge.reward.icon}</span>
                  <span className="reward-text">+{challenge.reward.amount} Points</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Challenges */}
      <Card className="challenges-card" shadow="medium" padding="large">
        <h3>Weekly Challenges</h3>
        <div className="challenges-grid">
          {weeklyChallenges.map(challenge => (
            <div key={challenge.id} className={`challenge-item ${challenge.completed ? 'completed' : ''}`}>
              <div className="challenge-header">
                <h4>{challenge.title}</h4>
                {challenge.completed && <span className="completed-icon">✅</span>}
              </div>
              <p>{challenge.description}</p>
              <div className="challenge-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">{challenge.progress}/{challenge.target}</span>
              </div>
              {challenge.completed && (
                <div className="reward-info">
                  <span className="reward-icon">{challenge.reward.icon}</span>
                  <span className="reward-text">{challenge.reward.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Rewards Shop */}
      <Card className="rewards-card" shadow="medium" padding="large">
        <h3>Rewards Shop</h3>
        <div className="rewards-grid">
          {availableRewards.map(reward => (
            <div key={reward.id} className={`reward-item ${reward.unlocked ? 'unlocked' : 'locked'}`}>
              <div className="reward-icon">{reward.icon}</div>
              <div className="reward-content">
                <h4>{reward.name}</h4>
                <p>{reward.description}</p>
                <div className="reward-cost">
                  <span className="cost-icon">⭐</span>
                  <span className="cost-amount">{reward.cost} Points</span>
                </div>
              </div>
              <Button
                variant={reward.unlocked ? "primary" : "secondary"}
                onClick={() => claimReward(reward)}
                disabled={!reward.unlocked}
                className="claim-btn"
              >
                {reward.unlocked ? 'Claim' : 'Locked'}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Level Up Modal */}
      {showLevelUp && (
        <div className="modal-overlay">
          <div className="level-up-modal">
            <div className="level-up-content">
              <div className="level-up-icon">🎉</div>
              <h2>Level Up!</h2>
              <p>Congratulations! You've reached Level {userLevel}</p>
              <p className="level-title">{getLevelTitle(userLevel)}</p>
              <div className="level-rewards">
                <div className="reward-item">
                  <span className="reward-icon">⭐</span>
                  <span>+50 Points</span>
                </div>
                <div className="reward-item">
                  <span className="reward-icon">🏆</span>
                  <span>New Badge Unlocked</span>
                </div>
              </div>
              <Button variant="primary" onClick={() => setShowLevelUp(false)}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reward Claimed Modal */}
      {showReward && currentReward && (
        <div className="modal-overlay">
          <div className="reward-modal">
            <div className="reward-content">
              <div className="reward-icon-large">{currentReward.icon}</div>
              <h2>Reward Claimed!</h2>
              <p>You've unlocked: {currentReward.name}</p>
              <p className="reward-description">{currentReward.description}</p>
              <Button variant="primary" onClick={() => setShowReward(false)}>
                Awesome!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationSystem;
