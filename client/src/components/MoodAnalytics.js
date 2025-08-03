import React from 'react';
import Card from './ui/Card';
import './MoodAnalytics.css';

const MoodAnalytics = ({ moodHistory }) => {
  // Process data for charts
  const processChartData = () => {
    const last30Days = moodHistory.slice(0, 30).reverse();
    
    const labels = last30Days.map(entry => 
      new Date(entry.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    );
    
    const scores = last30Days.map(entry => entry.score);
    
    const moodCategories = {
      'Very Happy (9-10)': 0,
      'Happy (7-8)': 0,
      'Neutral (5-6)': 0,
      'Sad (3-4)': 0,
      'Very Sad (1-2)': 0
    };

    moodHistory.forEach(entry => {
      if (entry.score >= 9) moodCategories['Very Happy (9-10)']++;
      else if (entry.score >= 7) moodCategories['Happy (7-8)']++;
      else if (entry.score >= 5) moodCategories['Neutral (5-6)']++;
      else if (entry.score >= 3) moodCategories['Sad (3-4)']++;
      else moodCategories['Very Sad (1-2)']++;
    });

    return { labels, scores, moodCategories };
  };

  const { labels, scores, moodCategories } = processChartData();

  const getAverageScore = () => {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return (total / scores.length).toFixed(1);
  };

  const getMoodInsights = () => {
    const insights = [];
    
    if (scores.length > 0) {
      const recentAvg = scores.slice(-7).reduce((sum, score) => sum + score, 0) / Math.min(7, scores.length);
      const overallAvg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      
      if (recentAvg > overallAvg + 1) {
        insights.push("Your mood has been improving recently! ��");
      } else if (recentAvg < overallAvg - 1) {
        insights.push("Your mood has been lower than usual. Consider reaching out for support. ��");
      }
      
      const highScores = scores.filter(score => score >= 8).length;
      const lowScores = scores.filter(score => score <= 3).length;
      
      if (highScores > lowScores * 2) {
        insights.push("You've had many positive days recently! ��");
      } else if (lowScores > highScores) {
        insights.push("You've been having some difficult days. Remember, it's okay to not be okay. 💙");
      }
    }
    
    return insights;
  };

  const insights = getMoodInsights();

  return (
    <Card className="mood-analytics" shadow="medium" padding="large">
      <h2>�� Mood Analytics</h2>
      
      <div className="analytics-grid">
        {/* Mood Trend Chart */}
        <div className="chart-container">
          <h3>Mood Trend (Last 30 Days)</h3>
          <div className="line-chart">
            {scores.map((score, index) => (
              <div key={index} className="chart-point">
                <div 
                  className="point" 
                  style={{ 
                    height: `${score * 10}%`,
                    backgroundColor: score >= 7 ? '#43e97b' : score >= 5 ? '#ffa502' : '#ff4757'
                  }}
                ></div>
                <span className="point-label">{labels[index]}</span>
                <span className="point-score">{score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="chart-container">
          <h3>Mood Distribution</h3>
          <div className="pie-chart">
            {Object.entries(moodCategories).map(([category, count], index) => {
              const percentage = moodHistory.length > 0 ? (count / moodHistory.length * 100).toFixed(1) : 0;
              const colors = ['#43e97b', '#38f9d7', '#ffa502', '#ff6348', '#ff4757'];
              
              return (
                <div key={index} className="pie-segment">
                  <div className="segment-info">
                    <span className="segment-color" style={{ backgroundColor: colors[index] }}></span>
                    <span className="segment-label">{category}</span>
                    <span className="segment-count">{count} ({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-container">
          <h3>Quick Statistics</h3>
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-label">Average Score</span>
              <span className="stat-value">{getAverageScore()}/10</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Entries</span>
              <span className="stat-value">{moodHistory.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tracking Streak</span>
              <span className="stat-value">{moodHistory.length} days</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Best Score</span>
              <span className="stat-value">{Math.max(...scores)}/10</span>
            </div>
          </div>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="insights-container">
            <h3>💡 Mood Insights</h3>
            <div className="insights-list">
              {insights.map((insight, index) => (
                <div key={index} className="insight-item">
                  {insight}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodAnalytics;
