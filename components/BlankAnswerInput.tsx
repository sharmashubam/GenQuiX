"use client";
import React, { useState } from "react";
import { Input } from "antd";

type Props = {
  answer: string;
  blanks: number[];
  setBlankAnswer: (answer: string) => void;
};

const BlankAnswerInput: React.FC<Props> = ({
  answer,
  blanks,
  setBlankAnswer,
}) => {
  const initialUserAnswer = answer
    .split(" ")
    .map((word, index) => (blanks.includes(index) ? "" : word));
  const [userAnswer, setUserAnswer] = useState<string[]>(initialUserAnswer);

  const handleAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = e.target.value;
    setUserAnswer(newAnswer);
    setBlankAnswer(newAnswer.join(" "));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {answer.split(" ").map((word, index) =>
        blanks.includes(index) ? (
          <Input
            key={index}
            value={userAnswer[index]}
            onChange={(e) => handleAnswerChange(e, index)}
            style={{ marginRight: "8px" }}
          />
        ) : (
          <span key={index} style={{ marginRight: "8px" }}>
            {word}{" "}
          </span>
        )
      )}
    </div>
  );
};

export default BlankAnswerInput;
