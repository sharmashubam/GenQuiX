import HistoryComponent from "@/components/HistoryComponent";
import HistoryCard from "@/components/dashboard/HistoryCard";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import React from "react";

type Props = {};
const Dashboard = (props: Props) => {
  return (
    <div className=" mt-32">
      Dashboard
      <QuizMeCard />
      <div>
        <HistoryCard />
      </div>
    </div>
  );
};

export default Dashboard;
