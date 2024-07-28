import QuizCreationForm from "@/components/forms/QuizCreationForm";
import React from "react";

export const metadata = {
  title: "Quiz | GenQuiX",
  description: "Quiz yourself on anything!",
};

const QuizPage = () => {
  return (
    <div>
      Quiz Page
      <QuizCreationForm />
    </div>
  );
};

export default QuizPage;
