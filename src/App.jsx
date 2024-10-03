import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "Ruby on Rails", "React", "Laravel"],
    answer: "React",
  },
  {
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    options: [
      "It refers to the global object",
      "It refers to the current object context",
      "It is used to create new functions",
      "It defines a variable"
    ],
    answer: "It refers to the current object context",
  },
  {
    question: "What is the default port for HTTP?",
    options: ["80", "443", "8080", "3000"],
    answer: "80",
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["Python", "HTML", "Java", "C++"],
    answer: "HTML",
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Application Protocol Interface",
      "Application Programming Instruction",
      "Automated Programming Interface"
    ],
    answer: "Application Programming Interface",
  },
  {
    question: "Which of the following is used for version control?",
    options: ["Git", "HTML", "CSS", "JavaScript"],
    answer: "Git",
  },
  {
    question: "What is the output of 'console.log(typeof NaN)'?",
    options: ["'number'", "'undefined'", "'object'", "'NaN'"],
    answer: "'number'",
  },
  {
    question: "Which data structure uses key-value pairs?",
    options: ["Array", "Stack", "Queue", "Object"],
    answer: "Object",
  },
  {
    question: "What is the purpose of the 'async' keyword in JavaScript?",
    options: [
      "To declare a synchronous function",
      "To declare a function that returns a promise",
      "To define a callback function",
      "To create a generator function"
    ],
    answer: "To declare a function that returns a promise",
  },
];


const StartScreen = ({ onStart }) => (
  <div className="start-container">
    <button className="start-button" onClick={onStart}>Start Quiz</button>
  </div>
);

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
    }
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setQuizComplete(false);
    setSelectedOption(null);
  };

  const getMotivationMessage = () => {
    return correctAnswers < 5 ? "Keep trying! 💪" : "Awesome job! 🎉";
  };

  return (
    <div className="App">
      <h1 className="title">Quiz Master</h1>
      {quizComplete ? (
        <div className="result">
          <h2>Results</h2>
          <div>Total Questions: <strong>{questions.length}</strong></div>
          <div>Score: <strong>{score / 10}</strong>/{questions.length}</div>
          <div>Correct Answers: <strong>{correctAnswers}</strong></div>
          <div>Wrong Answers: <strong>{questions.length - correctAnswers}</strong></div>
          <div className="motivation">{getMotivationMessage()}</div>
          <button className="play-again-button" onClick={handlePlayAgain}>Play Again</button>
        </div>
      ) : (
        <div className="question-container">
          <div className="breadcrumbs">{currentQuestion + 1}/{questions.length}</div>
          <div className="question">{questions[currentQuestion].question}</div>
          <div className="options">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                className={`option ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;