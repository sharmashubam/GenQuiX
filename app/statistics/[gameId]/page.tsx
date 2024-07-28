"use client"

import React from "react";
import StatisticsList from "@/components/StatisticsList";
type Props = {
  gameId: string;
};

const Statistics = ({ params }: { params: Props }) => {
  console.log(params.gameId);
  return (
    <div>
      <StatisticsList gameId={params.gameId} />
    </div>
  );
};

export default Statistics;
