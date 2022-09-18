import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
function App() {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const questions = [
    {
      text: "What is the capital of Egypt?",
      options: [
        { id: 0, text: "Alexandria", isCorrect: false },
        { id: 1, text: "Fayoum", isCorrect: false },
        { id: 2, text: "Luxor", isCorrect: false },
        { id: 3, text: "Cairo", isCorrect: true },
      ],
    },

    {
      text: "Where Is Egypt?",
      options: [
        { id: 0, text: "Africa", isCorrect: true },
        { id: 1, text: "Euro", isCorrect: false },
        { id: 2, text: "South America", isCorrect: false },
        { id: 3, text: "North America", isCorrect: false },
      ],
    },
    {
      text: "Which animal is known as the Ship of the Desert?",
      options: [
        { id: 0, text: "Cow", isCorrect: false },
        { id: 1, text: "Camel", isCorrect: true },
        { id: 2, text: "Cat", isCorrect: false },
        { id: 3, text: "DOg", isCorrect: false },
      ],
    },
    {
      text: "How many letters are there in the English alphabet?",
      options: [
        { id: 0, text: "24", isCorrect: false },
        { id: 1, text: "25", isCorrect: true },
        { id: 2, text: "26", isCorrect: true },
        { id: 3, text: "27", isCorrect: false },
      ],
    },
    {
      text: "What year was Es6 annonced?",
      options: [
        { id: 0, text: "2014", isCorrect: false },
        { id: 1, text: "2015", isCorrect: true },
        { id: 2, text: "2016", isCorrect: false },
        { id: 3, text: "2017", isCorrect: false },
      ],
    },
  ];
  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };
  return (
    <div className="App">
      <h1>React Test , Simple Quiz</h1>
      <h2>By : Ahmed Barakat</h2>
      {showResults ? (
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <Button variant="contained" onClick={() => restartGame()}>
            Restart game
          </Button>
        </div>
      ) : (
        <div className="question-card">
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li key={option.id}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => optionClicked(option.isCorrect)}
                    fullWidth
                  >
                    {option.text}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <h2>Score: {score}</h2>
      <h2>
        Question: {currentQuestion + 1} out of {questions.length}
      </h2>
    </div>
  );
}

export default App;
