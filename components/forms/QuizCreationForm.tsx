"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Spin,
  InputNumber,
  notification,
} from "antd";
import { useRouter } from "next/navigation";

type Props = {};
type NotificationProp = {
  title: string;
  description: string;
};
const QuizCreationForm = (props: Props) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = ({ title, description }: NotificationProp) => {
    console.log(`Notification: ${title}, ${description}`); // Added console log for notification
    api.open({
      message: title,
      description: description,
      className: "custom-class",
      showProgress: true,
      style: {
        width: 600,
      },
    });
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: {
    amount: number;
    topic: string;
    type: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch('http://0.0.0.0:8000/v1/quiz/start/game', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({
          topic: values.topic,
          game_type: values.type,
          amount: values.amount,
        }),
      });
      const data = await response.json();
      console.log(`Data fetched: ${JSON.stringify(data)}`); // Added console log for data fetching
      setLoading(false);
      if (data.status === 200) {
        if (values.type === "mcq") {
          router.push(`/play/mcq/${data.game.game_id}`);
        } else if (values.type === "open_ended") {
          router.push(`/play/open-ended/${data.game.game_id}`);
        }
      } else {
        openNotification({
          title: "Error",
          description: "Failed to start the game. Please try again later.",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(`Error fetching data: ${error}`); // Added console error for data fetching
      openNotification({
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <Spin spinning={loading}>
      {contextHolder}
      <Card title="Quiz Creation" bordered={false}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="topic"
                rules={[
                  { required: true, message: "Please input your topic!" },
                ]}
              >
                <Input placeholder="Enter a topic" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please input the number of questions!",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={10}
                  placeholder="How many questions?"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="type"
                rules={[{ required: true, message: "Please select a type!" }]}
              >
                <Radio.Group>
                  <Radio.Button value="mcq">Multiple Choice</Radio.Button>
                  <Radio.Button value="open_ended">Open Ended</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Card>
    </Spin>
  );
};

export default QuizCreationForm;
