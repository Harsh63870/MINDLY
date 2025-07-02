// question for landing page
import React, { useState } from "react";

const questions = [
  "How are you feeling today?",
  "How did you sleep last night?",
  "Are you feeling stressed?",
  "Do you feel supported by friends/family?",
];

function Questionnaire() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  if (current >= questions.length) {
    return <div>Thank you for sharing! Your responses have been recorded.</div>;
  }

  return (
    <div>
      <h3>{questions[current]}</h3>
      <button onClick={() => handleAnswer("Good")}>Good</button>
      <button onClick={() => handleAnswer("Okay")}>Okay</button>
      <button onClick={() => handleAnswer("Bad")}>Bad</button>
    </div>
  );
}

export default Questionnaire;