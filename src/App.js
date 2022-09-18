import { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import axios from "axios";
function App() {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQuestions();
  }, []);
  const getQuestions = () => {
    axios
      .get("http://localhost:3000/data/")
      .then((res) => {
        setQuestions(res.data.questions);
      })
      .then(() => {
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      {loading ? (
        <>
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
            // <div>{questions[0].text}</div>

            <div className="question-card">
              <h3 className="question-text">
                {questions[currentQuestion].text}
              </h3>

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
        </>
      ) : (
        <div>loading ...</div>
      )}
    </div>
  );
}

export default App;
