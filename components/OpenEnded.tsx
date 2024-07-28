"use client"
import React, { useState, useEffect } from "react";
import BlankAnswerInput from "./BlankAnswerInput";
import { notification } from 'antd';
import { Button, Card, Spin } from 'antd';
import { useRouter } from 'next/navigation';

type Question = {
    id: string;
    question: string;
    answer: string;
    blanks: number[];
};

const OpenEnded = ({ gameId }: { gameId: string }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/v1/quiz/game-questions/${gameId}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();

                const processedData = data.map((question: Question) => ({
                    ...question,
                    blanks: getBlanksIndexes(question.answer)
                }));
                
                setQuestions(processedData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [gameId]);

    const getBlanksIndexes = (answer: string) => {
        const words = answer.split(' ');
        return words.map((word, index) => word.length > 4 ? index : -1).filter(index => index !== -1);
    };

    const handleAnswerChange = (questionId: string, answer: string) => {
        setUserAnswers(prevState => ({
            ...prevState,
            [questionId]: answer
        }));
    };

    const checkAnswer = async (questionId: string, answer: string) => {
        if (!answer) {
            notification.error({
                message: 'Error',
                description: 'Please fill in the blanks before checking the answer.',
            });
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/v1/quiz/check-answer', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId,
                    userInput: answer
                })
            });
            if (!response.ok) throw new Error("Failed to check answer");
            const result = await response.json();
            console.log(result);
            console.log(answer)
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                router.push(`/statistics/${gameId}`);
            }
        } catch (error) {
            console.error("Error checking answer: ", error);
        }
    };

    return (
        <Spin spinning={questions.length === 0}> {/* Added Spin component for loading state */}
            <div>
                {questions.length > 0 && (
                    <Card key={questions[currentQuestionIndex].id} bordered={false} style={{ marginBottom: '20px' }}> {/* Added Card component for styling */}
                        <h2>{questions[currentQuestionIndex].question}</h2>
                        <BlankAnswerInput 
                            answer={questions[currentQuestionIndex].answer} 
                            blanks={questions[currentQuestionIndex].blanks} 
                            setBlankAnswer={(answer) => handleAnswerChange(questions[currentQuestionIndex].id, answer)} 
                        />
                        <Button type="primary" onClick={() => checkAnswer(questions[currentQuestionIndex].id, userAnswers[questions[currentQuestionIndex].id])} style={{ marginTop: '10px' }}>Check Answer</Button> {/* Added Button component for styling and spacing */}
                    </Card>
                )}
            </div>
        </Spin>
    );
};

export default OpenEnded;
