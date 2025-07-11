import React, { useState } from "react";
import "../styles/main.css";

const questions = [
  {
    text: "What brings you to Mindly?",
    options: [
      "I want to manage stress and anxiety",
      "I'm feeling low or unmotivated",
      "I want to build healthy habits",
      "I’m curious about my mental well-being",
      "I’m supporting someone else",
    ],
    multiple: false,
    helper: "Helps personalize content and features.",
  },
  {
    text: "How would you describe yourself?",
    options: [
      "Student",
      "Working professional",
      "Freelancer or creator",
      "Homemaker",
      "Unemployed or between jobs",
      "Prefer not to say",
    ],
    multiple: false,
  },
  {
    text: "What is your current focus or goal?",
    options: [
      "Improve sleep",
      "Reduce anxiety or overthinking",
      "Track mood and emotions",
      "Boost productivity or motivation",
      "Just exploring for now",
    ],
    multiple: false,
  },
  {
    text: "How much time can you invest daily in your well-being?",
    options: [
      "Less than 5 minutes",
      "5–10 minutes",
      "10–20 minutes",
      "20+ minutes",
      "It varies each day",
    ],
    multiple: false,
  },
  {
    text: "Which features are you most interested in?",
    options: [
      "Mood tracking",
      "Breathing or mindfulness exercises",
      "Daily mental health journal",
      "Motivational streaks & reminders",
      "Audio guides or affirmations",
      "Community or peer support forum",
    ],
    multiple: true,
    helper: "(Multiple choice allowed)",
  },
];

function Questionnaire() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [transitioning, setTransitioning] = useState(false);

  const handleOptionClick = (option) => {
    if (questions[current].multiple) {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    } else {
      setSelected([option]);
    }
  };

  const handleNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setAnswers([...answers, selected]);
      setSelected([]);
      setCurrent(current + 1);
      setTransitioning(false);
    }, 350); 
  };

  if (current >= questions.length) {
    return <div className="questionnaire-finish">Thank you for sharing! Your responses have been recorded.</div>;
  }

  const q = questions[current];
  return (
    <div className={`questionnaire-transition${transitioning ? " out" : " in"}`}>
      <h3>{q.text}</h3>
      {q.helper && <div className="question-helper">{q.helper}</div>}
      <div className="question-options">
        {q.options.map((option) => (
          <button
            key={option}
            className={`option-btn${selected.includes(option) ? " selected" : ""}`}
            onClick={() => handleOptionClick(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="next-btn"
        onClick={handleNext}
        disabled={selected.length === 0}
      >
        {current === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}

export default Questionnaire;