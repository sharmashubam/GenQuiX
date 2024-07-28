"use client";

import React, { useState, useEffect } from "react";
import { Card, Radio, Button } from "antd";
import { notification } from "antd";

type Question = {
  id: string;
  question: string;
  options: string[];
};

const MCQ = ({ gameId }: { gameId: string }) => {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);

  console.log(gameId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/v1/quiz/game-questions/${gameId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const parsedData = data.map((question: any) => ({
          ...question,
          options: JSON.parse(question.options),
        }));
        setQuizData(parsedData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  const currentQuestion: Question | undefined = quizData[currentQuestionIndex];

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const handleNextQuestion = async () => {
    if (selectedOption !== null && currentQuestion) {
      console.log("selectedOption_______________", selectedOption);
      const checkAnswerResponse = await fetch(
        "http://0.0.0.0:8000/v1/quiz/check-answer",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: currentQuestion.id,
            userInput: selectedOption,
          }),
        }
      );

      const checkAnswerData = await checkAnswerResponse.json();

      if (checkAnswerData.isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
        notification.success({
          message: "Correct Answer",
          description: "Your answer is correct!",
        });
      } else {
        notification.error({
          message: "Incorrect Answer",
          description: "Your answer is incorrect.",
        });
      }
      setUserAnswers({
        ...userAnswers,
        [currentQuestion.id]: selectedOption,
      });
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      {currentQuestion && (
        <Card title={`Question ${currentQuestionIndex + 1}`}>
          <p>{currentQuestion.question}</p>
          <Radio.Group onChange={handleOptionChange} value={selectedOption}>
            {Array.isArray(currentQuestion?.options) &&
              currentQuestion.options.map((option: string, index: number) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
          </Radio.Group>
        </Card>
      )}
      <div style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          onClick={handleNextQuestion}
          disabled={selectedOption === null || !currentQuestion}
        >
          Next
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>Correct Answers: {correctAnswers}</p>
      </div>
    </div>
  );
};

export default MCQ;
