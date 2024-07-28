"use client";

import { useState, useEffect } from "react";
import { List, Card, Button } from "antd";
import Link from "next/link";

const HistoryComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://0.0.0.0:8000/v1/quiz/games");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item>
              <Card title={`Game ID: ${item.id}`} bordered={false}>
                <p>Topic: {item.topic}</p>
                <p>Game Type: {item.game_type}</p>
                <p>Started: {item.time_started}</p>
                <Button type="primary">
                  <Link href={`/statistics/${item.id}`}>View Details</Link>
                </Button>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
export default HistoryComponent;
