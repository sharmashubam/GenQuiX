"use client";

import React from "react";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import { History } from "lucide-react";

type Props = {};

const HistoryCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-95"
      onClick={() => {
        router.push("/history");
      }}
    >
      <div className="flex flex-row items-center justify-between pb-2 space-y-0">
        <p className="text-2xl font-bold">History</p>
        <History size={28} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          View past quiz attempts.
        </p>
      </div>
    </Card>
  );
};

export default HistoryCard;
