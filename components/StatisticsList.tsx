"use client";

import React, { useEffect, useState } from "react";
import { Card, Statistic, List } from "antd";

const StatisticsList = ({ gameId }: { gameId: string }) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://0.0.0.0:8000/v1/quiz/game-questions/${gameId}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setData(data);
      } catch (error: any) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      }
    };
    fetchData();
  }, [gameId]);

  const calculateStatistics = (questions: any[]) => {
    const totalCorrect = questions.filter(
      (question) => question.question_type === "mcq" && question.is_correct
    ).length;
    const totalPassed = questions.filter(
      (question) => question.question_type === "mcq"
    ).length;
    const openEndedCount = questions.filter(
      (question) => question.question_type === "open_ended"
    ).length;
    const totalPercentage = questions.reduce(
      (acc, question) =>
        question.question_type === "open_ended"
          ? acc + (question.percentage_correct || 0)
          : acc,
      0
    );
    const averagePercentage = openEndedCount
      ? totalPercentage / openEndedCount
      : 0;

    return { totalCorrect, totalPassed, averagePercentage };
  };

  const { totalCorrect, totalPassed, averagePercentage } =
    calculateStatistics(data);

  return (
    <div className="mt-32">
      <Card title="Statistics" bordered={false}>
        {data.some((question) => question.question_type === "mcq") && (
          <>
            <Statistic title="Total Correct" value={totalCorrect} />
            <Statistic title="Total Passed" value={totalPassed} />
          </>
        )}
        {data.some((question) => question.question_type === "open_ended") && (
          <Statistic
            title="Average Percentage Correct"
            value={averagePercentage.toFixed(2) + "%"}
          />
        )}
      </Card>
      <List
        header={<div>Questions and Answers</div>}
        bordered
        dataSource={data}
        renderItem={(question) => (
          <List.Item key={question.id}>
            <Card title={question.question}>
              <p>Correct Answer: {question.answer}</p>
              <p>Your Answer: {question.user_answer}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default StatisticsList;
